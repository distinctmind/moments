import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

// import CalendarPicker from "react-native-calendar-picker";
import {Calendar, DateData} from 'react-native-calendars';

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
        <View style={{flex: 1, margin: 20}}>
          <Calendar 
            onDayPress={day => setSelectedDate(day.dateString)} 
            markedDates={{
              [selectedDate]: { selected: true },
            }}
          />
          <Text style={{fontWeight: 'bold', marginVertical: 15}}>{new Date(selectedDate).toDateString()}</Text>
          <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
            <TouchableOpacity style={{backgroundColor: 'black', borderWidth: 1, borderColor: 'white', borderRadius: 10, width: '100%', height: 50, padding: 10, justifyContent: 'center'}}>
              <Text style={{textAlign: 'center', color: 'white'}}>Add Data</Text>
            </TouchableOpacity>
          </View>
        </View>
    </SafeAreaView>
  )
}

export default Home