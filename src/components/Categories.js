import { View, Text, ScrollView } from 'react-native'
import React,{useEffect,useState} from 'react'
import CategoryCard from './CategoryCard'
import sanityClient  from '../../sanity';

const Categories = () => {
  const [categories,setCategories]=useState([]);

  useEffect(()=>{
    sanityClient.fetch(`
    *[_type=="category"]{
      ...,
    }
    `).then(data=>setCategories(data))
  },[])

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal:15,
        paddingTop:10,

      }}
    >
      {categories?.map(data=>
        <CategoryCard key={data._id} imgUrl={data.image} title={data.name}/>
        )}
      
    </ScrollView>
  )
}

export default Categories;