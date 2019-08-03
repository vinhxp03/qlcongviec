import React, { Component } from 'react';
import './App.css';
import TaskSearchControl from './components/TaskSearchControl';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            isDisplayForm: true
        };
    }

    componentDidMount() {
        if (localStorage  && localStorage.getItem('tasks')) {
            this.setState({
                tasks: JSON.parse(localStorage.getItem('tasks'))
            });
        }
    }

    onGenerateData = () => {
        var tasks = [];
        var is_false = [2];

        for (let i = 0; i < 5; i++) {
            tasks.push({
                id: this.onGenerateId(),
                name: this.onGenerateString(),
                status: is_false.includes(i) ? false : true
            });
        }

        this.setState({
            tasks: tasks
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onGenerateString = () => {
        var text = "";
        var len = 10

        var charset = "abcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < len; i++) {
            let randomVal = charset.charAt(Math.floor(Math.random() * charset.length));
            text += (i===4) ? randomVal + " ": randomVal;
        }

        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    onGenerateId = () => {
        return Math.random().toString(36).substr(2, 9);
    }

    onToggleForm = () => {
        this.setState({
            isDisplayForm: !this.state.isDisplayForm
        });
    }

    onCloseForm = () => {
        this.setState({
            isDisplayForm: false
        });
    }

    onSubmit = (data) => {
        var { tasks } = this.state;
        data.id = this.onGenerateId();
        tasks.push(data);

        console.log(data);
        // Close task form
        // this.onCloseForm();

        // localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    render() {
        var  { tasks, isDisplayForm } = this.state;
        var elmTaskForm = isDisplayForm ? <TaskForm onSubmit={ this.onSubmit } onCloseForm={ this.onCloseForm } /> : '';

        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản lý công việc</h1>
                    <hr></hr>
                </div>

                <div className="row">
                    <div className={ isDisplayForm ? 'col-md-4' : ''}>
                        { elmTaskForm }
                    </div>
                    <div className={ isDisplayForm ? 'col-md-8' : 'col-md-12'}>
                        <button type="button" className="btn btn-primary" onClick={ this.onToggleForm }>
                            <span className="fa fa-plus mr-5" ></span> Thêm công việc
                        </button> &nbsp;

                        <button type="button" className="btn btn-primary" onClick={() => this.onGenerateData() }>
                            <span className="fa fa-plus mr-5" ></span> Generate
                        </button>

                        <TaskSearchControl />
                        <br/>
                        <TaskList tasks={ tasks }/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
