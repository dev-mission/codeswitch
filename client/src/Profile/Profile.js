import { Route, Switch, useRouteMatch } from "react-router-dom";

import ProfileList from './ProfileList';
import ProfileForm from './ProfileForm';

function Profiles(){
    const {path} = useRouteMatch();

    return(
        <Switch>
            <Route exact path= {path}>
                <ProfileList />
            </Route>
            <Route path={`${path}/new`} >
                <ProfileForm/>
            </Route>

            <Route path={`${path}/:id/edit`}>
                <ProfileForm />
            </Route>
        </Switch>
    );
}

export default Profiles;