import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Api from "../Api";

function ProfileForm() {
    const { id } = useParams();
    const history = useHistory();
    const [profile, setProfile] = useState({
        //firstName: '',
        //lastName: '',
        //email: '',
        //password: '',
        // start of added attributes
        type: 'Choose...',
        school: '',
        gender: 'Choose...',
        sexualOrientation: 'Choose...',
        race: 'Choose...',
        ethnicity: '',
        collegeMajor: '',
        geoLocation: '',
        // how do i use the type to determine what shows?
        companyName: '',
        industryExperience: ''
        // end of added attributes
    });

    useEffect(function () {
        if (id) {
            Api.users.get(id).then((response) => setProfile(response.data));
        }
    }, []);

    function onChange(event) {
        const newProfile = { ...profile };
        newProfile[event.target.name] = event.target.value;
        setProfile(newProfile);
    }

    async function onSubmit(event) {
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
    return (
        <main className="container"><br></br>
            <div class="info-form">
                <h1 >LET'S GET INTRODUCTIONS<br></br>OUT OF THE WAY.</h1>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="type">I am a</label>
                        <select className="form-select" id="type" name="type" onChange={onChange} value={profile.type}>
                            <option>Choose...</option>
                            <option>Student</option>
                            <option>Volunteer</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="school">Where do you go to school?</label>
                        <input type="text" className="form-control" id="school" name="school" onChange={onChange} value={profile.school} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="collegeMajor">Major</label>
                        <input type="text" className="form-control" id="collegeMajor" name="collegeMajor" onChange={onChange} value={profile.collegeMajor} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="geoLocation">Geograhpic Location</label>
                        <input type="text" className="form-control" id="geoLocation" name="geoLocation" onChange={onChange} value={profile.geoLocation} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="gender">Gender</label>
                        <select className="form-select" id="gender" name="gender" onChange={onChange} value={profile.gender}>
                            <option>Choose...</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Transgender</option>
                            <option>Non-Binary</option>
                            <option>Decline to state</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="sexualOrientation">Sexual Orientation</label>
                        <select className="form-select" id="sexualOrientation" name="sexualOrientation" onChange={onChange} value={profile.sexualOrientation}>
                            <option>Choose...</option>
                            <option>Heterosexual/Straight</option>
                            <option>Homosexual/Gay</option>
                            <option>Decline to state</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="race">Race</label>
                        <select className="form-select" id="race" name="race" onChange={onChange} value={profile.race}>
                            <option>Choose...</option>
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
                        <label className="form-label" htmlFor="ethnicity">Ethnicity</label>
                        <input type="text" className="form-control" id="ethnicity" name="ethnicity" onChange={onChange} value={profile.ethnicity} />
                    </div>

                    <button className="btn btn-primary" type="submit">></button><br></br><br></br><br></br>
                </form>
            </div>
        </main>
    )
}

export default ProfileForm;

// <div className="mb-3">
//<label className="form-label" htmlFor="firstName">First name</label>
//<input type="text" className="form-control" id="firstName" name="firstName" onChange={onChange} value={profile.firstName} />
//</div>
//<div className="mb-3">
//<label className="form-label" htmlFor="lastName">Last name</label>
//<input type="text" className="form-control" id="lastName" name="lastName" onChange={onChange} value={profile.lastName} />
//</div>
//<div className="mb-3">
//<label className="form-label" htmlFor="email">Email</label>
//<input type="text" className="form-control" id="email" name="email" onChange={onChange} value={profile.email} />
//</div>
//<div className="mb-3">
//<label className="form-label" htmlFor="password">Password</label>
//<input type="password" className="form-control" id="password" name="password" onChange={onChange} value={profile.password} />
//</div>

// <p>{JSON.stringify(profile)}</p>