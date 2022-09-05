export default {
    name: 'featured',
    title: 'Featured Menu Category',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Featured Category name',
        type: 'string',
        validation:(Rule)=>Rule.required(),
      },
      {
        name:"short_description",
        type:"string",
        title:"Short description",
        validation:(Rule)=>Rule.max(200),
      },
      {
        name: 'resturant',
        title: 'Restaurant',
        type: 'array',
        of:[{type:"reference",to:[{type:"resturant"}]}],
      },
    ],
  }