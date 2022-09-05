import { View, Text, ScrollView } from 'react-native'
import React,{useEffect,useState} from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import ResturantCard from './ResturantCard'
import sanityClient  from '../../sanity';

const FeaturedRow = (props) => {
    const [restaurants,setRestaurants]=useState([]);
    useEffect(()=>{
        sanityClient.fetch(`
        *[_type=="featured" && _id=="6e9645b2-9e24-40d8-aa44-ed8a4847cce5"]{
            ...,
            resturant[]->{
              ...,
              dishes[]->,
              type->{
                name
              }
            },
          }[0]
        `,{id:props.id}).then(data=>{
            setRestaurants(data?.resturant);
        }).catch(e=>{
            console.log("ERRor",e);
        })
    },[props.id])

  return (
    <View>
        <View className="mt-4 flex-row items-center justify-between px-4" >
            <Text className="font-bold text-lg">{props.title}</Text>
            <ArrowRightIcon color="#00CCBB"/>
        </View>
        <Text className="text-xs text-gray-500 px-4">{props.description}</Text>
        <ScrollView
            horizontal
            contentContainerStyle={{
                paddingHorizontal:15,
            }}
            showsHorizontalScrollIndicator={false}
            className="pt-4"
        >
            {/* Resturants Cards */}
            {restaurants?.map(restaurant=>{
                
                return <ResturantCard
                        key={restaurant._id}
                        id={restaurant._id}
                        imgUrl={restaurant.image}
                        address={restaurant.address}
                        title={restaurant.name}
                        dishes={restaurant.dishes}
                        rating={restaurant.rating}
                        shortDescription ={restaurant.short_description}
                        genre={restaurant.type.name}
                        long={restaurant.long}
                        lat={restaurant.lat}
            />
            })}

        </ScrollView>
    </View>
  )
}

export default FeaturedRow