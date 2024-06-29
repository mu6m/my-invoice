import chromium from '@sparticuz/chromium-min';
import puppeteer from 'puppeteer-core';
import edgeChromium from 'chrome-aws-lambda';

async function takeScreenshot() {
	const browser = await puppeteer.launch({
		args: chromium.args,
		defaultViewport: chromium.defaultViewport,
		executablePath: await chromium.executablePath(await edgeChromium.executablePath)
	});

	const page = await browser.newPage();
	page.setDefaultNavigationTimeout(60 * 1000);

	// This try/catch block handles the cases where the page fails to load but returns a valid HTTP status as well
	// as the case where the goto() function throws an error (e.g. due to a timeout)
	try {
		const response = await page.goto('/dashboard/invoice');
		if (response && !response.ok) {
			await browser.close();
			console.warn(`Failed to load page: ${response.status()} ${response.statusText()}`);
			throw new Error(`Failed to load page: ${response.status()} ${response.statusText()}`);
		}
	} catch (e: any) {
		await browser.close();
		console.warn(`Failed to load page: ${e?.message}`);
		throw new Error(`Failed to load page: ${e?.message}`);
	}

	const screenshot = await page.screenshot({
		type: 'webp',
		captureBeyondViewport: false
	});
	await browser.close();
	return screenshot;
}
