import { Tabs } from 'expo-router'
import React from 'react'

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen name='(homeStack)' options={{ title: "Home", headerShown: false }} />
            <Tabs.Screen name='cart' options={{ title: "Cart" }} />
        </Tabs>
    )
}