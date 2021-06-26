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
      startDate: null,
      endDate: null,
      startDateString: '',
      endDateString: '',
      totalClasses: 0,
    };
  }

  componentDidMount() {
    console.log("Hola1", this.props);
    this.setState({
      tableData: this.props.route.params.tableData,
      totalClasses: this.props.route.params.totalClasses,
      startDateString: this.props.route.params.startDate,
      endDateString: this.props.route.params.endDate,
    });
  }

  renderAttendanceChart() {
    console.log("Hola2", this.state.tableData)
    return (
      <View style={styles.container}>
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
