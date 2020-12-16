import React from 'react';
import { Header } from 'react-native-elements';
import { DrawerActions, useNavigation } from '@react-navigation/native';

export interface ToolbarProps {
    title: string;
    menu?: boolean;
    back?: boolean;
    settings?: boolean;
}

const toolbar = (props: ToolbarProps) => {
    const nav = useNavigation()
    
    let leftComponent:{icon?:string, color?:string, size?:number, onPress?:any} = {}
    
    if (props.menu) leftComponent =  {icon:'menu', color:'white', size:30, onPress: () => nav.dispatch(DrawerActions.toggleDrawer())}
    if (props.back) leftComponent =  {icon:'arrow-back', color:'white', size:30, onPress: () => nav.goBack()}

    return (
        <Header 
            leftComponent={leftComponent}
            centerComponent={{text: props.title, style:{color: 'white', textTransform:'uppercase'}}}
            containerStyle={{backgroundColor: '#1E90FF'}}
        />
    )
}

export default toolbar;