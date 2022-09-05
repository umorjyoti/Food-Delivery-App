import { View, Text, Touchable, TouchableOpacity, Image ,BackHandler} from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../../features/restaurantSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/solid';
import * as ProgressBar from 'react-native-progress';
import MapView, { Marker } from 'react-native-maps'; 

const DeliveryScreen = () => {

    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);


  return (
    <View className="bg-[#00ccbb] flex-1">
      <SafeAreaView className="z-50" > 
        <View className="flex-row justify-between items-center p-5">
            <TouchableOpacity onPress={()=>navigation.navigate("HomeScreen")}>
                <XMarkIcon color="white" size={25} />
            </TouchableOpacity>
            <Text className="font-light text-white text-lg " >Order Help</Text>
        </View>
        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50  shadow-xl" style={{shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 7,
},
shadowOpacity: 0.41,
shadowRadius: 9.11,

elevation: 14,}} >
           <View className="flex-row justify-between" >
           <View>
                <Text className="text-lg text-gray-400" >Estimated Arrival</Text>
                <Text className="text-4xl font-bold" >45-55 Minutes</Text>
            </View>
            <Image source={{
                    uri:"https://links.papareact.com/fls"
                 }} 
                    className="h-20 w-20"
                />
           </View>

           <ProgressBar.Bar size={60} indeterminate={true} color="#00ccbb"/>
           <Text className="mt-3 text-gray-500" >
                 Your order at {restaurant.title} is being prepared 
           </Text>

        </View>
      </SafeAreaView>
      <MapView
            initialRegion={{
                latitude:restaurant.lat,
                longitude:restaurant.long,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
            className="flex-1 -mt-10 z-8 h-full"
            mapType='mutedStandard'
            style={{minHeight:100}}
        >   
            <Marker
                coordinate={{
                    latitude:restaurant.lat,
                    longitude:restaurant.long
                }}
                title={restaurant.title}
                description={restaurant.short_description}
                identifier={"origin"}
                pinColor="#00ccbb"
            />

        </MapView>
        <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28" >
             <Image source={{uri:"https://links.papareact.com/wru"}}
                className="h-12 w-12 bg-gray-300 rounded-full ml-5"
             />
             <View className="flex-1 " >
                <Text className="text-lg " >Umorjyoti Chetia</Text>
                <Text className="text-gray-400" >Your Rider</Text>
             </View>
             <Text className="text-[#00ccbb] text-lg mr-5 font-bold" >Call</Text>
        </SafeAreaView>
      
    </View>
  )
}

export default DeliveryScreen