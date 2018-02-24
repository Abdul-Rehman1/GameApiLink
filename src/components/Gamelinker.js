import React, { Component } from 'react';
import {} from '../store/action/action'
import { connect } from 'react-redux';
//import ChatBox from './chatbox';
let API = 'https://www.giantbomb.com/api/games/?api_key=6f3e77aec1bee16891f01dcb429171f75fd89d45&format=json&filter=original_release_date:2017-02-17|2018-02-17&field_list=name,image,original_release_date,site_detail_url';
const DEFAULT_QUERY = 'redux';
class GameLister extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          hits: [],
          res:{},
          stday:"0",
          stmonth:"0",
          styear:"0",
          edDay:"0",
          edmonth:"0",
          edyear:"0"
        
        };
        this.searchHandler=this.searchHandler.bind(this);
    }
   
    //https://www.giantbomb.com/api/games/?api_key=6f3e77aec1bee16891f01dcb429171f75fd89d45&format=json&filter=original_release_date:2017-02-17|2018-02-17&field_list=name,image,original_release_date,site_detail_url
    componentWillMount() {
        fetch(API )
        .then(response => response.json())
        .then(data =>this.setState({hits:data.results,res:data}));
    }
    componentWillUpdate(){
        fetch(API )
        .then(response => response.json())
        .then(data =>this.setState({hits:data.results,res:data}));
    }
    dateHandler(val,ev){
        
        if(val.substring(3,val.length)=="st")
        {
            if(val.substring(0,2)=="dt"){
                this.setState({stday:ev.target.value});
            }
            else if(val.substring(0,2)=="mn"){
                this.setState({stmonth:ev.target.value});
            }
            else if(val.substring(0,2)=="yr"){
                this.setState({styear:ev.target.value});
            }
        }
        else if(val.substring(3,val.length)=="ed")
        {
            if(val.substring(0,2)=="dt"){
                this.setState({edDay:ev.target.value});
            }
            else if(val.substring(0,2)=="mn"){
                this.setState({edmonth:ev.target.value});
            }
            else if(val.substring(0,2)=="yr"){
                this.setState({edyear:ev.target.value});
            }
        }
    }
   searchHandler(){
        let stateObj=this.state;
        let startDate="";
        let endDate="";
        let isCor=true;
        if(stateObj.stday!="0" && stateObj.stmonth!="0" && stateObj.styear!="0")
        {
            startDate=stateObj.styear+"-"+stateObj.stmonth+"-"+stateObj.stday;
        }
        else{
            alert("Start Date is not Correct");
            isCor=false;
        }
        if(stateObj.edDay!="0" && stateObj.edmonth!="0" && stateObj.edyear!="0")
        {
           
            endDate=stateObj.edyear+"-"+stateObj.edmonth+"-"+stateObj.edDay;
            let startdt=new Date(stateObj.stmonth+"-"+stateObj.stday+"-"+stateObj.styear);
            let enddt=new Date(stateObj.edmonth+"-"+stateObj.edDay+"-"+stateObj.edyear);
            if(startdt>enddt){
                alert("Start date can  not be greater than End date");
                isCor=false;    
            }
           
        }
        else{
            alert("End Date is not Correct");
            isCor=false;
        }
        if(startDate!="" && endDate!="" && isCor ){
            //console.log(startDate+"-"+endDate);
            API = 'https://www.giantbomb.com/api/games/?api_key=6f3e77aec1bee16891f01dcb429171f75fd89d45&format=json&filter=original_release_date:'+startDate+'|'+endDate+'&field_list=name,image,original_release_date,site_detail_url';
           this.forceUpdate();
        }

    }
    render() {
        let days=[];
        let months=[];
        let years=[];
        console.log(this.state.stday);
        for(let i=1;i<=31;i++){
           let j;
            if(i<10)  j="0"+i;
            else j=i;
            days.push(""+j+"");
        }
        for(let i=1;i<=12;i++){
            let j;
            if(i<10)  j="0"+i;
            else j=i;
            months.push(""+j+"");
        }
        for(let i=1990;i<=2018;i++){
            years.push(i);
        }
     const { hits } = this.state;
     let counter=hits.length;
        return (
          <div className="mainComp">
              <div className="borderDot">
                <p>Releasing year (start value)</p>
                <select name="dt-st" onChange={this.dateHandler.bind(this,"dt-st")}>
                    <option value="0">Day</option>
                    {days.map(day =>
                    <option key={day} value={day}>{day}</option>
                    )}
                </select>
                
                <select name="mn-st" onChange={this.dateHandler.bind(this,"mn-st")}>
                    <option value="0">Month</option>
                    {months.map(month =>
                    <option key={month} value={month}>{month}</option>
                    )}
                </select>
                
                <select name="yr-st" onChange={this.dateHandler.bind(this,"yr-st")}>
                    <option value="0">Year</option>
                    {years.map(year =>
                    <option key={year} value={year}>{year}</option>
                    )}
                </select>
              </div>
              <div className="borderDot">
                <p>Releasing year (end value)</p>
                <select name="dt-ed" onChange={this.dateHandler.bind(this,"dt-ed")}>
                    <option value="0">Day</option>
                    {days.map(day =>
                    <option key={day} value={day}>{day}</option>
                    )}
                </select>
                
                <select name="mn-ed" onChange={this.dateHandler.bind(this,"mn-ed")}>
                    <option value="0">Month</option>
                    {months.map(month =>
                    <option key={month} value={month}>{month}</option>
                    )}
                </select>
                
                <select name="yr-ed" onChange={this.dateHandler.bind(this,"yr-ed")}>
                    <option value="0">Year</option>
                    {years.map(year =>
                    <option key={year} value={year}>{year}</option>
                    )}
                </select>
              </div>
              <button onClick={this.searchHandler}>Search</button>
              <p>{(counter>0)?"Showing "+counter+" Results":""}</p>
              {
                  hits.map(function(hit,index){
                      
                    return(<div key={index}>
                        <img src={hit.image.icon_url} alt={hit.name+"-image"}/>
                        <span className="gname">{hit.name}</span>
                        <p>{hit.original_release_date.slice(0,10)}</p>
                        <a href={hit.site_detail_url} target="_blank">Detail URL</a>
                        <p></p>
                    </div>)
                     
                  })
              }
          </div>
        );
     }
}

function mapStateToProp(state) {
    return ({
       // currentUser: state.root.currentUser,
       // allUsers: state.root.users,
      //  allMessages: state.root.messages,
      //  recipientID: state.root.recipientID


    })
}
function mapDispatchToProp(dispatch) {
    return ({
        // changeUserName: ()=>{dispatch(changeUserName())}
      // changeRecUID: (recID)=>{
       //    dispatch(changeRecipientUID(recID));
     //  }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(GameLister);