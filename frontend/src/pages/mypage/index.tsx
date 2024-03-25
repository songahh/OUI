import Button from 'src/components/control/Button/Button';
import { Drawer } from 'src/components/control/Drawer';
import { Header } from 'src/components/control/Header';
import axios from 'axios';
import styled from 'styled-components'
import { NotificationModal } from 'src/components/control/NotificationModal.tsx';

const MyPage = () => {
    console.log(axios.defaults.headers.common["Authorization"])

    const handleNotificationSelection = (userChoice) => {
        if (userChoice) {
          console.log("User agreed to receive notifications.");
        } else {
          console.log("User declined notifications.");
        }
      };
    return(
        <>
            <Header>
                <Button path='/mypage' btType='back' name="temp"></Button>
                <Button path='/mypage' btType='user' name="temp"></Button>
            </Header>
            <NotificationModal isOpen={true} onClose={() => console.log('Modal closed')} onNotificationSelect={handleNotificationSelection}></NotificationModal>
            <div>
                <h1>MyPage</h1>
            </div>
        </>
    );
}
export default MyPage;