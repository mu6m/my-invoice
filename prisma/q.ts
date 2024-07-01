import { createPool, sql } from 'slonik';

async function getProductsWithFeatures(ids) {
	const pool = await createPool(
		'postgres://postgres.xicjxvoojqueqwefcnhk:X5HVEygKhSmFhKwI@aws-0-us-west-1.pooler.supabase.com:5432/postgres'
	);
	try {
		const query = sql`
      SELECT
        p.id AS product_id,
        p.title AS product_title,
        p.price AS product_price,
        jsonb_agg(jsonb_build_object(
          'id', pf.id,
          'name', pf.name,
          'type', pf.type,
          'required', pf.required,
          'options', pf.option
        )) AS features
      FROM product p
      LEFT JOIN product_features pf ON p.id = pf."productId"
      WHERE p.id IN (${sql.join(ids, sql`, `)})
      GROUP BY p.id, p.title, p.price
      ORDER BY p.id;
    `;

		const result = await pool.query(query); // Assuming 'pool' is your Slonik connection pool
		return result.rows;
	} catch (error) {
		console.error('Error fetching products with features:', error.message);
		throw error;
	}
}

const productIds = ['cly0luuci0001jb5tjy9qo2rf'];
getProductsWithFeatures(productIds)
	.then((products) => {
		console.log('Products with features:', products);
	})
	.catch((err) => {
		console.error('Error:', err);
	});
