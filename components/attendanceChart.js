import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, SafeAreaView, Text} from 'react-native';
import {Table, Row} from 'react-native-table-component';

//import CalendarPicker from the package we installed
import CalendarPicker from 'react-native-calendar-picker';

class AttendanceChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Sl.No', 'Name', 'Present', 'Absent', '% age'],
      widthArr: [40, 300, 100, 100, 120],
      startDate: null,
      endDate: null,
    };
  }

  renderCalendar() {
    const onDateChange = (date, type) => {
      //function to handle the date change
      if (type === 'END_DATE') {
        this.setState({endDate: date});
      } else {
        this.setState({startDate: date, endDate: null});
      }
    };
    return (
      <SafeAreaView style={styles_calendar.container}>
        <View style={styles_calendar.container}>
          <Text style={styles_calendar.titleStyle}>
            React Native Calendar Picker
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
          <View style={styles_calendar.textStyle}>
            <Text style={styles_calendar.textStyle}>Selected Start Date :</Text>
            <Text style={styles_calendar.textStyle}>
              {this.state.startDate ? this.state.startDate.toString() : ''}
            </Text>
            <Text style={styles_calendar.textStyle}>Selected End Date :</Text>
            <Text style={styles_calendar.textStyle}>
              {this.state.endDate ? this.state.endDate.toString() : ''}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  renderAttendanceChart() {
    const state = this.state;
    const tableData = [];
    for (let i = 0; i < 30; i += 1) {
      const rowData = [];
      for (let j = 0; j < 5; j += 1) {
        rowData.push(`${i}${j}`);
      }
      tableData.push(rowData);
    }

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
                  {tableData.map((rowData, index) => (
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
    paddingTop: 30,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  textStyle: {
    marginTop: 10,
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 20,
    margin: 20,
  },
});

export default AttendanceChart;
