import axios from 'axios';
import { GET_SESSIONS, ADD_SESSION, DOWNLOAD_SESSION, SESSIONS_LOADING, DOWNLOAD_RECORD } from './types';
import Cookies from 'universal-cookie';
import { PublicURL } from '../config/constants';
const cookies = new Cookies();

export const getSessions = (pid, courseCode) => dispatch => {
    dispatch(setSessionsLoading());
    axios.get(PublicURL + ":5001/nox/api/sessions/AllSessions", {
        params: { pid: pid, courseCode: courseCode }
    })
        .then(res => dispatch({
            type: GET_SESSIONS,
            payload: res.data
        }))
}

//Want to put session data into a text file and download.
export const downloadSession = (courseCode) => dispatch => {
    console.log(courseCode);
    axios.get(PublicURL + `:5001/nox/api/sessions/sesid`, { //this gets the sesid from Session schema
        params: {
            courseCode: courseCode,
        }
    }).then(res => {
        //console.log(`hi there`+JSON.stringify(res.data.sesid));
        dispatch({
            type: DOWNLOAD_SESSION,
            payload: res.data
        })
        return axios.get(PublicURL + `:5001/nox/api/sessions/session.txt`, {
            params: {
                sesid: res.data.sesid,
                responseType: 'blob'
            }
        }).then(res => { //this gets the session data from the Records schema
            dispatch({
                type: DOWNLOAD_RECORD,
                payload: res.data
            })
            console.log(`second axios success `+JSON.stringify(res.data))
            let blob = new Blob([JSON.stringify(res.data)], {type : "text/plain;charset=utf-8"})
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'session.txt'); //or any other extension
            document.body.appendChild(link);
            link.click();
        })
    })
}

export const getUniqueSession = (sesid) => dispatch => {
    axios.get(PublicURL + `:5001/nox/api/sessions/session.txt`, {
        params: {
            courseCode: sesid,
            responseType: 'blob'
        }
    }).then(res => {
        dispatch({
            type: DOWNLOAD_RECORD,
            payload: res.data
        })
        console.log(JSON.stringify(res.data))
        let blob = new Blob([JSON.stringify(res.data)], {type : "text/plain;charset=utf-8"})
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'session.txt'); //or any other extension
        document.body.appendChild(link);
        link.click();
    })
}

export const addSession = (Session) => dispatch => {
    //var sesid = genHexCode(6);

    //Session.sesid = sesid;
    axios.post('sessions', Session, { baseURL: PublicURL + ':5001/nox/api/' })
        .then(res => {
            console.log(`Received response from server: ${{ res }}`);
            dispatch({
                type: ADD_SESSION,
                payload: res.data
            })
            cookies.set('Prof_sesid', res.data.sesid);
            window.location = "/nox/professor/dashboard";
        })
}

export const setSessionsLoading = () => {
    return {
        type: SESSIONS_LOADING
    };
}
