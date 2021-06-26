import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, SafeAreaView, Text} from 'react-native';
import {Table, Row} from 'react-native-table-component';

//import CalendarPicker from the package we installed
import CalendarPicker from 'react-native-calendar-picker';
import axios from 'axios';

class AttendanceStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Sl.No', 'Name', 'Present', 'Absent', '% age'],
      widthArr: [40, 300, 100, 100, 120],
      tableData: [],
      startDate: null,
      endDate: null,
      startDateString: "",
      endDateString: "",
      totalClasses: 0
    };
  }

  renderCalendar() {
    const onDateChange = (date, type) => {
      console.log(date)
      var currentDate = new Date(date)
      var date1 = currentDate.getDate();
      var month = currentDate.getMonth(); 
      var year = currentDate.getFullYear();

      var dateString = date1 + "-" +(month + 1) + "-" + year;
      console.log(dateString)
      //function to handle the date change
      if (type === 'END_DATE') {
        this.setState({endDate: date});
        this.setState({endDateString: dateString});
      } else {
        this.setState({startDateString: dateString, endDateString: ""});
        this.setState({startDate: date, endDate: null});
      }
    };
    return (
      <SafeAreaView style={styles_calendar.container}>
        <View style={styles_calendar.container}>
          <Text style={styles_calendar.titleStyle}>
            Select start date and end date to check students attendance record
          </Text>
          <CalendarPicker
            startFromMonday={true}
            allowRangeSelection={true}
            minDate={new Date(2018, 1, 1)}
            maxDate={new Date(2050, 6, 3)}
            weekdays={['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']}
            months={[
              'January',
              'Febraury',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ]}
            previousTitle="Previous"
            nextTitle="Next"
            todayBackgroundColor="#e6ffe6"
            selectedDayColor="#66ff33"
            selectedDayTextColor="#000000"
            scaleFactor={375}
            textStyle={{
              fontFamily: 'Cochin',
              color: '#000000',
            }}
            onDateChange={onDateChange}
          />
        </View>
      </SafeAreaView>
    );
  }

  renderAttendanceChart() {
    const state = this.state;
    axios.get(`/attendance/getAttendance?groupId=3&startDate=${state.startDate}&endDate=${state.endDate}`).then(function (response) {
      console.log(response.data)
      this.setState({totalClasses: response.data.totalClasses, tableData: response.data.data})
    })
    .catch(err => console.log(err))
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderCalendar()}
          {this.state.startDate && this.state.endDate ? (
            <ScrollView horizontal={true}> 
            <View>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                <Row
                  data={state.tableHead}
                  widthArr={state.widthArr}
                  style={styles.header}
                  textStyle={styles.text}
                />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                  {state.tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[
                        styles.row,
                        index % 2 && {backgroundColor: '#F7F6E7'},
                      ]}
                      textStyle={styles.text}
                    />
                  ))}
                </Table>
              </ScrollView>
            </View>
            </ScrollView>
          ) : null}
        </ScrollView>
      </View>
    );
  }

  render() {
    return this.renderAttendanceChart()
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  header: {height: 50, backgroundColor: '#537791'},
  text: {textAlign: 'center', fontWeight: '100'},
  dataWrapper: {marginTop: -1},
  row: {height: 40, backgroundColor: '#E7E6E1'},
});

const styles_calendar = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#ffffff',
    padding: 5,
  },
  textStyle: {
    marginTop: 10,
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 12,
    margin: 5,
  },
});

export default AttendanceStats;