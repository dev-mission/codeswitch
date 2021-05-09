import { useEffect, useState } from "react";
import {useHistory, useParams} from "react-router-dom";
import Api from "../Api";

function ProfileForm() {
    const {id} = useParams();
    const history = useHistory();
    const [profile, setProfile] = useState({
        // do we add attributes here? + line 41
        name: '',
        position: 0,
    });

    useEffect(function(){
        if (id) {
            Api.users.get(id).then((response) => setProfile(response.data));
        }
    }, []);

    function onChange(event) {
        const newProfile = {...profile};
        newProfile[event.target.name] = event.target.value;
        setProfile(newProfile);
    }

    async function onSubmit(event){
        event.preventDefault();
        try {
            if (id) {
                await Api.users.update(id, profile);
            } else {
                await Api.users.create(profile);
            }
            history.push('/profiles');
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <main className="container">
        <h1>LET'S GET INTRODUCTIONS OUT OF THE WAY.</h1>
        <form onSubmit={onSubmit}>
        <div className="mb-3">
            <label className="form-label">Name</label>
            <input className="form-control" type="text" name="name" value={profile.name} onChange={onChange} />
        </div>
        <div className="mb-3">
            <label className="form-label">Position</label>
            <input className="form-control" type="text" name="position" value={profile.position} onChange={onChange}/>
        </div>
        <button className="btn btn-primary" type="submit">Submit</button>
        </form>
        <p>{JSON.stringify(profile)}</p>
    </main>
    )
}

export default ProfileForm;