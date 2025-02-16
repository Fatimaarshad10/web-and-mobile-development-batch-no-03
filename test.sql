WITH category_revenue AS (
    SELECT 
        Products.category,  
        Suppliers.supplier_name,  
        SUM(Sales.quantity * Products.price) AS total_revenue
    FROM 
        Sales
    INNER JOIN 
        Products ON Sales.product_id = Products.product_id
    INNER JOIN 
        Suppliers ON Products.supplier_id = Suppliers.supplier_id
    GROUP BY 
        Products.category, Suppliers.supplier_name
),
max_revenue AS (
    SELECT 
        category, 
        MAX(total_revenue) AS max_revenue
    FROM 
        category_revenue
    GROUP BY 
        category
)
SELECT 
    cr.category, 
    cr.supplier_name, 
    cr.total_revenue
FROM 
    category_revenue cr
INNER JOIN 
    max_revenue mr ON cr.category = mr.category AND cr.total_revenue = mr.max_revenue;
