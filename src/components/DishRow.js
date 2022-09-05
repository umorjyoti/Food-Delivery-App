import { View, Text, Touchable,TouchableOpacity, Image } from 'react-native'
import React,{useState} from 'react'
import { urlFor } from '../../sanity'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, selectBasketItem, selectBasketItemsWithId ,removeFromBasket} from '../../features/basketSlice';

const DishRow = (props) => {
    const [isPressed, setIsPressed] = useState(false);
    const items=useSelector(state=>selectBasketItemsWithId(state,props.id));
    const dispatch=useDispatch();

    const addItemToBasket=()=>{
        dispatch(addToBasket({id:props.id,name:props.name,description:props.description,price:props.price,image:props.image}))
    }

    const removeItemFromBasket =()=> {
        if(!items.length>0){
            return;
        }
        dispatch(removeFromBasket({id:props.id}))
    }

  return ( 
    <>
    <TouchableOpacity onPress={()=>setIsPressed(!isPressed)} className={`bg-white border p-4 border-gray-200 ${isPressed && "border-b-0"}`}>
        <View className="flex-row">
        <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{props.name}</Text>
            <Text className="text-gray-400" >{props.description}</Text>
            <Text className="text-gray-400 mt-2">₹ {props.price}</Text>
        </View>
        <View>
            <Image source={{uri:urlFor(props.image).url()}} className="h-20 w-20 p-4 bg-gray-300" style={{borderWidth:1,borderColor:"#F3F3F4"}} />
        </View>
        </View>
    </TouchableOpacity>
    {isPressed && (
        <View className="bg-white px-4">
            <View className="flex-4 items-center space-x-2 pb-3 flex-row">
                <TouchableOpacity onPress={removeItemFromBasket} disabled={items.length==0} >
                    <MinusCircleIcon color={items.length?"#00CCBB":"gray"}  size={40} />
                </TouchableOpacity>
                <Text>{items.length}</Text>
                <TouchableOpacity onPress={addItemToBasket}>
                    <PlusCircleIcon color={"#00CCBB"}  size={40}/>
                </TouchableOpacity>
            </View>
        </View>
    )}
  </>
  )

}

export default DishRow