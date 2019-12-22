import React, { Component } from 'react';
import '../../assets/styles/Result.css';
import left_arrow_icon from '../../assets/img/left-arrow.svg';
import cross_icon from '../../assets/img/close.svg';
import check_icon from '../../assets/img/check.svg';
import check_mark_icon from '../../assets/img/check-mark.svg';
import Search from '../Search/Search';

class Result extends Component {

    constructor(props) {
        super(props);
        this.ids = localStorage.getItem('ids') ? localStorage.getItem('ids').split(',') : [];
        this.state = {
            results: [],
            goBack: false,
            clean: false,
        }

        this.goBack = this.goBack.bind(this);
        this.clean = this.clean.bind(this);
    }

    componentDidMount(){
        if (this.props.data.length > 0) {
            this.setState(() => ({
                results: this.props.data[0].documents.map((item) => {
                    if (this.ids.indexOf(item.id) > -1) {
                        item.checked = true;
                    } else {
                        item.checked = false;
                    }
                    return item;
                })
            }));
        }
    }

    getImage(fileName) {
        return 'https://d1wrci9wmi4ouq.cloudfront.net/' + fileName;
    }
    changeCheckMark(id, green) {
        let arr = this.state.results;
        arr.map((item => {
            if (item.id === id) {
                item.checked = !item.checked;
                if (green === true) {
                    this.ids.push(item.id);
                } else {
                    this.ids.splice(this.ids.indexOf(item.id), 1);
                }
            }
            return item;
        }));
        JSON.stringify(localStorage.setItem('ids', this.ids));
        // this.setState
        this.setState({
            results:arr,
        });
    }
    goBack() {
        this.setState ({
            goBack: true,
        });
    }clean() {
        this.setState ({
            clean: true,
        });
    }
    render() {
        let search = this.props.search;

        if (this.state.goBack) {
            return <Search search={search}/>
        } else if (this.state.clean) {
            return <Search search={""}/>
        }
        return (
            <div className="results">
                <div className="row ">
                    <div className="column small-8">
                        <div className="result">
                            <i className="leftArrow">
                                <img src={left_arrow_icon} alt="" onClick={this.goBack}/>
                            </i>
                            <p>
                                {search}
                            </p>
                            <i className="crossIcon">
                                <img src={cross_icon} alt="" onClick={this.clean}/>
                            </i>
                        </div>
                    </div>
                </div>
                <div className="row ">
                    <div className="column small-8">
                        <div className="players">
                            <p>
                                PLAYERS
                            </p>
                            </div>
                    </div>
                </div>
                <div>
                    {this.props.data.length === 0 ?
                     <div className="empty">
                    <p> Not Found Players </p> </div> : null}
                    {this.state.results.map((item, index) =>
                        <div className="items" key={index}>
                            <div className="row ">
                                <div className="column small-8">
                                    <div>
                                        {item.images ?
                                            <div className="avatar">
                                                <img src={this.getImage(item.images.default.filePath)}  alt="avatar"/>
                                            </div>
                                            : <div className="defaultImage">
                                                <p>
                                                    WIN
                                                </p>
                                            </div>}
                                    </div>
                                </div>
                            </div>
                            <div className="row " key={index}>
                                <div className="column small-8">
                                    <div className="name">
                                        <span>{item.nick_name}</span>
                                        {item.checked === false ?
                                            <img src={check_icon} alt="check" onClick={() => this.changeCheckMark(item.id, true)}/>
                                            :  <img src={check_mark_icon} alt="check" onClick={() => {if (window.confirm('Do you want to uncheck?')) this.changeCheckMark(item.id, false) }}/>}
                                        <div className="firstName">
                                            {item.first_name ?
                                                <span> {item.first_name} </span> : null}
                                            {item.last_name ?
                                                <span> {item.last_name + ' '} </span> : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}


export default Result;
