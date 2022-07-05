// All products will share this schema. Each product should have 5 specific fields as defined below 
export default{
    name: 'product',
    title: 'Product',
    type: 'document',
    // product fields 
    fields: [
        // first object of field - image of the product
        {
            name: 'image', 
            title: 'Image',
            type: 'array',
            of: [{type:'image'}],
            options: {
                hotspot: true,
            }
        },
        // second object of field - name
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        // third object of field - slug
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 90,
            }
        }, 
        // fourth object of the field - price 
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        // fifth object of the field - description / details 
        {
            name: 'details',
            title: 'Details',
            type: 'string'
        }

    ]
}