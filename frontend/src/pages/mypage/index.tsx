import Button from 'src/components/control/Button/Button';
import { Drawer } from 'src/components/control/Drawer';
import { Header } from 'src/components/control/Header';
import axios from 'axios';
import styled from 'styled-components'

const MyPage = () => {
    console.log(axios.defaults.headers.common["Authorization"])
    return(
        <>
            <Header>
                <Button path='/mypage' btType='back' name="temp"></Button>
                <Button path='/mypage' btType='user' name="temp"></Button>
            </Header>
            <div>
                <h1>MyPage</h1>
            </div>
        </>
    );
}
export default MyPage;