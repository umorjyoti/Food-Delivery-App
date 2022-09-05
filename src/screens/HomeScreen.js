import React,{useLayoutEffect,useEffect,useState} from 'react';
import {FlatList, Image, ScrollView, Text,TextInput,View} from 'react-native';
import {useNavigation }from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import {ChevronDownIcon,UserIcon,MagnifyingGlassIcon,AdjustmentsVerticalIcon} from 'react-native-heroicons/outline'
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient  from '../../sanity';

const HomeScreen=()=>{
    const navigation = useNavigation();
    const [featuredCategories,setFeaturedCategories]=useState([]);

    useLayoutEffect(() => {
     navigation.setOptions({
        headerShown:false,
     });
    }, []);

    useEffect(()=>{
        sanityClient.fetch(`
        *[_type=="featured"]{
            ...,
            resturant[]->{
              ...,
              dishes[]->{
              ...,
            }
            },
          }`).then((data)=>{
            setFeaturedCategories(data);
          })
    },[])

    return <SafeAreaView className="bg-white flex-1">
        
        {/* Header */}
        <View className="flex-row pb-3 items-center mx-4 space-x-2" >
            <Image
                source={{
                    uri:"https://links.papareact.com/wru",
                }}
                className="h-7 w-7 bg-gray-300 p-4 rounded-full"
            />
            <View className="flex-1">
                <Text className="font-bold text-gray-400 text-xs">Deliver Now</Text>
                <View className="flex-row items-end space-x-1"><Text className="font-bold text-xl">
                    Current Location 
                </Text>
                <ChevronDownIcon size={20} color="#00CCBB" /></View>
            </View>
            <UserIcon size={35} color="#00CCBB"/>
        </View>

         {/* Seacrh */}
         <View className="flex-row items-center space-x-2 pb-2 mx-4">
            <View className="h-11 rounded-xl flex-row space-x-2 flex-1 bg-gray-200 p-3 items-center">
                <MagnifyingGlassIcon color="gray" size={20}/>
                <TextInput placeholder='Resturants and Cuisines' keyboardType='default'/>
            </View>
            <AdjustmentsVerticalIcon color="#00CCBB"/>
         </View>
         
        <ScrollView>
            {/* Catergories */}
            <Categories/>

            {/* Featured Rows */}
            {featuredCategories?.map(category=>{
                return <FeaturedRow
                key={category._id}
                id={category._id}
                title={category.name}
                description={category.short_description}
            />
            })}

        </ScrollView>
    </SafeAreaView>
}

export default HomeScreen;