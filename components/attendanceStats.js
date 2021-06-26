import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, SafeAreaView, Text} from 'react-native';
import {Table, Row} from 'react-native-table-component';

class AttendanceStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Roll.No', 'Name', 'Present', 'Absent', '% age'],
      widthArr: [60, 300, 100, 100, 80],
      tableData: [],
      startDate: '',
      endDate: '',
      totalClasses: 0,
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      title: this.props.route.params.group.groupName + ' Attendance record',
    });
    this.setState({
      tableData: this.props.route.params.tableData,
      totalClasses: this.props.route.params.totalClasses,
      startDate: this.props.route.params.startDate,
      endDate: this.props.route.params.endDate,
    });
  }

  renderAttendanceChart() {
    return (
      <View style={styles.container}>
        <View>
          <Text>Start Date : {this.state.startDate}</Text>
          <Text>End Date : {this.state.endDate}</Text>
          <Text>No of Classes : {this.state.totalClasses}</Text>
          <Text>No of Students : {this.state.tableData.length}</Text>
          <Text></Text>
          <Text></Text>
        </View>
        <ScrollView>
          <ScrollView horizontal={true}>
            <View>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                <Row
                  data={this.state.tableHead}
                  widthArr={this.state.widthArr}
                  style={styles.header}
                  textStyle={styles.text}
                />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                  {this.state.tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={this.state.widthArr}
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
        </ScrollView>
      </View>
    );
  }

  render() {
    return this.renderAttendanceChart();
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  header: {height: 50, backgroundColor: '#537791'},
  text: {textAlign: 'center', fontWeight: '100'},
  dataWrapper: {marginTop: -1},
  row: {height: 40, backgroundColor: '#E7E6E1'},
});

export default AttendanceStats;
