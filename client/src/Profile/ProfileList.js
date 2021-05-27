import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Api from '../Api';

function ProfileList() {
    const [profiles, setProfiles] = useState([]);

    useEffect(function () {
        Api.users.index().then(response => setProfiles(response.data));
    }, []);

    function onDelete(profile) {
        if (window.confirm(`Are you sure you want to delete ${profile.name}?`)) {
            // we'll execute code to delete the section
            Api.users.delete(profile.id).then(function () {
                const newProfiles = profiles.filter(s => s.id !== profile.id);
                setProfiles(newProfiles);
            });
        }
    }

    return (
        <main className="container">
            <div className="announcement">
                <div className="black-box">
                    <h1 className="redirect-msg">head over to the prototype</h1>
                    <p className="redirectt">don't judge...</p>
                </div>
            </div>
        </main>
    );
}

export default ProfileList;

/**
 * <h1>Profile List</h1>
        <Link className="btn btn-primary" to="/profiles/new">New</Link>
        <ul>
            {profiles.map(s => (
                <li key= {s.id}>
                    <p><Link to={`/profiles/${s.id}/edit`}>{s.firstName} {s.lastName}</Link></p>
                    <p><button onClick={() => onDelete(s)} type="button" className="btn btn-sm btn-danger">Delete</button></p>
                </li>
            ))}
        </ul>
 */