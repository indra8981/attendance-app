import React, {Component} from 'react';
import {StyleSheet, View, SafeAreaView, Text} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import axios from './axios';
import {Button} from 'react-native-elements';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      startDate: null,
      endDate: null,
      startDateString: '',
      endDateString: '',
      totalClasses: 0,
      buttonDisabled: true,
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      title: this.props.route.params.group.groupName,
    });
  }

  renderCalendar() {
    const onDateChange = (date, type) => {
      console.log(date);
      var currentDate = new Date(date);
      var date1 = currentDate.getDate();
      var month = currentDate.getMonth();
      var year = currentDate.getFullYear();

      var dateString = date1 + '-' + (month + 1) + '-' + year;
      console.log(dateString);
      if (type === 'END_DATE') {
        this.setState({
          endDate: date,
          endDateString: dateString,
        });
      } else {
        this.setState({
          startDateString: dateString,
          endDateString: '',
          startDate: date,
          endDate: null,
        });
      }
      if (this.state.startDate && this.state.endDate) {
        this.setState({buttonDisabled: true});
      } else {
        this.setState({buttonDisabled: false});
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

  renderButton() {
    return (
      <Button
        title="Get attendance record"
        type="outline"
        disabled={this.state.buttonDisabled}
        onPress={async () => {
          console.log('dhukechi');
          console.log(this.state);
          const attendancePayload = {
            groupId: this.props.route.params.group.id,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
          };
          response = await axios.post(
            `/attendance/getAttendance`,
            attendancePayload,
          );
          console.log('Hola', response.data);
          console.log(response.data.data, response.data.totalClasses);
          console.log(this.state);
          this.props.navigation.navigate('attendanceStats', {
            tableData: response.data.data,
            totalClasses: response.data.totalClasses,
            startDate: this.state.startDateString,
            endDate: this.state.endDateString,
            group: this.props.route.params.group,
          });
        }}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderCalendar()}
        {this.renderButton()}
      </View>
    );
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

export default Calendar;
