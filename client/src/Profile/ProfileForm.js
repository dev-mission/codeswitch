import { useEffect, useState } from "react";
import {useHistory, useParams} from "react-router-dom";
import Api from "../Api";

function ProfileForm() {
    const {id} = useParams();
    const history = useHistory();
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
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
                await Api.users.update(id, profile); // when it's singular, it becomes dark blue..not sure if this is right + 31, 45, 49, 53 lines
            } else {
                await Api.auth.register(profile);
            }
            history.push('/profiles');
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <main className="container">
        <h1>Profile Form</h1>
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label className="form-label" htmlFor="firstName">First name</label>
                <input type="text" class="form-control" id="firstName" name="firstName" onChange={onChange} value={profile.firstName} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="lastName">Last name</label>
                <input type="text" class="form-control" id="lastName" name="lastName" onChange={onChange} value={profile.lastName} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="email">Email</label>
                <input type="text" class="form-control" id="email" name="email" onChange={onChange} value={profile.email} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="password">Password</label>
                <input type="password" class="form-control" id="password" name="password" onChange={onChange} value={profile.password} />
            </div>
            <button className="btn btn-primary" type="submit">Submit</button>
        </form>
        <p>{JSON.stringify(profile)}</p>
    </main>
    )
}

export default ProfileForm;