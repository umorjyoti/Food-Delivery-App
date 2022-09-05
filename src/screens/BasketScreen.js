import { View, Text, SafeAreaView, Touchable, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../../features/restaurantSlice';
import { removeFromBasket, selectBasketItem, selectBasketTotal } from '../../features/basketSlice';
import ResturantCard from '../components/ResturantCard';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { urlFor } from '../../sanity';

const BasketScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectBasketItem);
    const [groupedItems,setGroupedItems] = useState([]);
    const dispatch = useDispatch();
    const basketTotal = useSelector(selectBasketTotal);

    useMemo(()=>{
        const groupedItems = items.reduce((results,item)=>{
            (results[item.id]=results[item.id] || []).push(item)
            return results;
        },{})
        setGroupedItems(groupedItems);
    },[items])

  return (
    <SafeAreaView className="mt-5 flex-1 bg-white">
        <View className="flex-1 bg-gray-100">
            <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
                <View>
                    <Text className="text-lg font-bold text-center" >Basket</Text>
                    <Text className="text-center text-gray-400">{restaurant.title}</Text>
                </View> 
                <TouchableOpacity onPress={()=>navigation.goBack()} className="rounded-full bg-gray-100  absolute top-3 right-5">
                    <XCircleIcon color="#00CCBB" height={50} width={50}/>
                </TouchableOpacity>
            </View>
            <View className="flex-row items-center space-x-4 px-4 py-4 bg-white my-5">
                <Image source={{uri:"https://links.papareact.com/wru"}} className="h-7 w-7 bg-gray-300 p-4 rounded-full"/>
                <Text className="flex-1">Deliver in 50-75 minutes</Text>
                <TouchableOpacity>
                    <Text className="text-[#00CCBB]" >Change</Text>
                </TouchableOpacity>
            </View>
            <ScrollView className="divide-y divide-gray-200">
                {Object.entries(groupedItems).map(([key,items])=>(
                    <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5 ">
                        <Text className="text-[#00ccbb]">{items.length} X</Text>
                        <Image source={{uri:urlFor(items[0]?.image).url()}} className="h-12 w-12 rounded-full" />
                        <Text className="flex-1">{items[0]?.name}</Text>

                        <Text className="text-gray-600" >₹ {items[0]?.price}</Text>

                        <TouchableOpacity onPress={()=>dispatch(removeFromBasket({id:key}))}>
                            <Text className="text-[#00ccbb] text-xs">
                                Remove
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <View className="p-5 bg-white mt-5 space-y-4">
                <View className="flex-row justify-between">
                    <Text className="text-gray-400">Subtotal</Text>
                    <Text className="text-gray-400" >₹ {basketTotal }</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="text-gray-400">Delivery fee</Text>
                    <Text className="text-gray-400" >₹ 50</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="">Order Total</Text>
                    <Text className="font-extrabold" >₹ {basketTotal+50}</Text>
                </View>
            </View>

            <TouchableOpacity onPress={()=>navigation.navigate("PreparingScreen")} className="rounded-lg bg-[#00ccbb] p-4">
                <Text className="text-center text-white text-lg font-bold" >Place Order</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default BasketScreen