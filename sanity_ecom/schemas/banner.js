// Schema for the banner pobject
export default {
    name: 'banner',
    title: 'Banner',
    type: 'document', 
    fields: [
        // first field - image
        {
            name: 'image',
            title: 'Image',
            type: 'image', 
            options: {
                hotspot: true, 
            },
        },
        // second field - button text 
        {
            name: 'buttonText',
            title: 'ButtonText',
            type: 'string',
        },
        // third field - product
        {
            name: 'product',
            title: 'Product',
            type: 'string',
        },
        // fourth field - description
        {
            name: 'desc', 
            title: 'Desc',
            type: 'string',
        },
        // fifth field - small text 
        {
            name: 'smallText', 
            title: 'SmallText',
            type: 'string',
        },
        // fifth field - mid text 
        {
            name: 'midText', 
            title: 'MidText',
            type: 'string',
        },
        // sixth field - large text 1
        {
            name: 'largeText1', 
            title: 'LargeText1',
            type: 'string',
        },
        // seventh field - large text 2
        {
            name: 'largeText2', 
            title: 'LargeText2',
            type: 'string',
        },
        // eighth field - discount 
        {
            name: 'discount', 
            title: 'Discount',
            type: 'string',
        },
        // ninth field - sale time 
        {
            name: 'saleTime', 
            title: 'SaleTime',
            type: 'string',
        },
    ]

}