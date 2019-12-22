import React, { Component } from 'react';
import search_icon from '../../assets/img/search_icon.svg';
import '../../assets/styles/Search.css';
import Api from '../../modules/Api';
import Result from '../Result/Result';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: '',
            data: '',
        }
        this.search = this.search.bind(this);
    }
    componentDidMount() {
        if (this.props.search) {
            document.getElementById('search').value = this.props.search;
        }
    }

    search() {
        let searchString = document.getElementById('search').value.toLowerCase();

        if (searchString.length >= 2) {

            Api.apiCall('get', 'search', {
                q: searchString,
                index: 'player'
            }).then(resp => {
                if (resp.status !== 200) {
                    console.log(resp.status);
                }
                if ('error' in resp.data) {
                    console.log(resp.data.error);
                } else {
                    this.setState(() => ({
                        searchString: searchString,
                        data: resp.data
                    }));
                }
            }).catch(e => {
                console.log(e);
            })
        } else {
            this.setState({
                searchString: searchString,
            });
        }
    };

    render() {
        if (this.state.searchString) {
            return <Result search={this.state.searchString} data={this.state.data}/>
        }
        return (
            <div className="row align-justify align-middle">
                <div className="column">
                    <div className="search form-input">
                        <input id='search' type="text" onChange={event => this.search()} autocomplete="off"/>
                        <i>
                            <img src={search_icon} alt=""
                                 onClick={this.search}/>
                        </i>
                    </div>
                </div>
            </div>
        );
    }
}


export default Search;
