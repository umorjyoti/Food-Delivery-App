import { View, Text, Touchable, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { StarIcon } from 'react-native-heroicons/solid'
import { MapPinIcon } from 'react-native-heroicons/outline'
import { urlFor } from '../../sanity'
import { useNavigation } from '@react-navigation/native'


const ResturantCard = (props) => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=>{
        navigation.navigate("RestaurantScreen",{props});
    }} className="mr-3 bg-white" style={{elevation:8,}} >
        <Image
            source={{uri:urlFor(props.imgUrl).url()}}
            className="h-36 w-64 rounded-sm"
        />
        <View className="px-4 pb-4 shadow">
            <Text className="font-bold text-lg pt-2">{props.title}</Text>
            <View className="flex-row items-center space-x-1">
                <StarIcon color="green" opacity={0.5} size={22} />
                <Text className="text-sm text-gray-500"><Text className="text-green-500">{props.rating}</Text> - {props.genre}</Text>
            </View>
            <View className="flex-row items-center space-x-1">
                <MapPinIcon color="gray" opacity={0.4} size={22}/>
                <Text className="text-xs text-gray-500">Nearby - {props.address}</Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default ResturantCard