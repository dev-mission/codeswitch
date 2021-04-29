import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Api from '../Api';

function ProfileList(){
    const [profiles, setProfiles] = useState([]);

    useEffect(function() {
        Api.profiles.index().then(response => setProfiles(response.data));
    }, []);

    function onDelete(profile){
        if (window.confirm(`Are you sure you want to delete ${profile.name}?`)){
            // we'll execute code to delete the section
            Api.profiles.delete(profile.id).then(function() {
                const newProfiles = profile.filter(s => s.id !== profile.id);
                setProfiles(newProfiles);
            });
        }
    }

    return (
        <main className="container">
        <h1>Profile List</h1>
        <Link className="btn btn-primary" to="/profiles/new">New</Link>
        <ul>
            {profiles.map(s => (
                <li key= {s.id}>
                    <p><Link to={`/profiles/${s.id}/edit`}>{s.name}{s.position}</Link></p>
                    <p><button onClick={() => onDelete(s)} type="button" className="btn btn-sm btn-danger">Delete</button></p>
                </li>
            ))}
        </ul>
        </main>
    );
}

export default ProfileList;