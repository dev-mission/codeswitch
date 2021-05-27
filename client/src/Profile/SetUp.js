import { useEffect, useState } from "react";
import {useHistory, useParams} from "react-router-dom";
import Api from "../Api";

function ProfileForm() {
    const {id} = useParams();
    const history = useHistory();
    const [profile, setProfile] = useState({
        // start of added attributes
        type: '',
        school: '',
        gender: '',
        sexualOrientation: '',
        race: '',
        ethnicity: '',
        collegeMajor: '',
        geoLocation: '',
        // how do i use the type to determine what shows?
        companyName: '',
        industryExperience: ''
        // end of added attributes
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
                await Api.auth.register(profile);
            }
            history.push('/profiles');
        } catch (error) {
            console.log(error);
        }
    }
    // bootstrap link: https://getbootstrap.com/docs/5.0/forms/overview/ 
    return(
        <main className="container">
        <h1>LET'S GET INTRODUCTIONS<br></br>OUT OF THE WAY.</h1>
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label className="form-label" htmlFor="type">I am a</label>
                <select class="form-select" id="pType" name="pType" onChange={onChange} value={profile.type}>
                    <option selected>Choose...</option>
                    <option>Student</option>
                    <option>Volunteer</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="password">Where do you go to school?</label>
                <input type="text" class="form-control" id="college" name="college" onChange={onChange} value={profile.college} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="password">Major</label>
                <input type="text" class="form-control" id="collegeMajor" name="collegeMajor" onChange={onChange} value={profile.collegeMajor} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="password">Geograhpic Location</label>
                <input type="text" class="form-control" id="geoLocation" name="geoLocation" onChange={onChange} value={profile.geoLocation} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="type">Gender</label>
                <select class="form-select" id="gender" name="gender" onChange={onChange} value={profile.gender}>
                    <option selected>Choose...</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Transgender</option>
                    <option>Non-Binary</option>
                    <option>Decline to state</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="type">Sexual Orientation</label>
                <select class="form-select" id="sexualOrientation" name="sexualOrientation" onChange={onChange} value={profile.sexualOrientation}>
                    <option selected>Choose...</option>
                    <option>Heterosexual/Straight</option>
                    <option>Homosexual/Gay</option>
                    <option>Decline to state</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="type">Race</label>
                <select class="form-select" id="race" name="race" onChange={onChange} value={profile.race}>
                    <option selected>Choose...</option>
                    <option>Asian American</option>
                    <option>African American/Black</option>
                    <option>Hispanic/Latin</option>
                    <option>American Indian/Alaska Native</option>
                    <option>White</option>
                    <option>Mixed</option>
                    <option>Decline to state</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="password">Ethnicity</label>
                <input type="text" class="form-control" id="ethnicity" name="ethnicity" onChange={onChange} value={profile.ethnicity} />
            </div>
            
            <button className="btn btn-primary" type="submit">Submit</button>
        </form>
        <p>{JSON.stringify(profile)}</p>
    </main>
    )
}

export default ProfileForm;