import InviteIcon from "src/asset/images/icon/invite-icon.svg";
import BellIcon from "src/asset/images/icon/bell-icon.svg";
import MegaphoneIcon from "src/asset/images/icon/megaphone-icon.svg";
import DiaryIcon from "src/asset/images/icon/diary-icon.svg";
import RouterIcon from "src/asset/images/icon/router-icon.svg";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import styled from "styled-components";

const IconType = {
    'Invite': InviteIcon,
    'SystemForcing': BellIcon,
    'FriendForcing': MegaphoneIcon,
    'FriendDiary': DiaryIcon,
}

const AlarmWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    width: 97%;
    padding: 15px 10px;
`;

const StringWrapper = styled.div`
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    flex-grow: 1;
    width: 100%;
    padding-left: 10px
`;

const IconWrapper = styled.img`
    width: 24px;
    margin-right: 10px;
`;

const ActionsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    gap: 5px; 
    margin-right: 10px
    margin-left: 10px;
`;

const AcceptButton = styled(Button)`
    background-color: #88B3E2;
    font-family: 'Dovemayo';
    color: white;
    &:hover {
        background-color: #F09690;
        border: 0px;
    }
    border: 0px;
    font-size: 0.85rem; 
    padding: 6px; 
    box-shadow: none;
    min-width: 50px;
`;
const RejectButton = styled(Button)`
    background-color: #F09690;
    font-family: 'Dovemayo';
    color: white;
    &:hover {
        background-color: #F09690;
        border: 0px;
    }
    border: 0px;
    font-size: 0.85rem; 
    padding: 6px; 
    box-shadow: none;
`;


const AlarmMessage = ( { Type, Title, Content ,onClick, diaryId, Accept, Refuse, link, alarmId }: AlarmProps  ) => {

const SelectedIcon = IconType[ Type ];

    return(
        <>
            <AlarmWrapper>
                <div style={{ display:'flex', flexDirection: 'row', marginLeft: '10px', marginRight: '10ox' }}>
                    <IconWrapper src={SelectedIcon} alt="icon"/>
                    <StringWrapper>
                        <span style={{ fontSize: "20px", fontWeight: "bold", paddingBottom: "5px" }}>{ Title }</span>
                        <span style={{ width: "100%", textWrap: "wrap" }}>{ Content }</span>
                    </StringWrapper>
                </div>
                <ActionsWrapper>
                    { Type === "Invite" ? (
                        <>
                            <AcceptButton variant="contained" onClick={() => Accept(diaryId)}>수락</AcceptButton>
                            <RejectButton variant="outlined" onClick={() => Refuse(diaryId)}>거절</RejectButton>
                        </>
                    ) : (
                        <IconButton onClick={()=>{ onClick( link, alarmId ) }} style={{ padding: "0px" }}>
                            <img src={RouterIcon} alt="router"/>
                        </IconButton>
                    )}
                </ActionsWrapper>
            </AlarmWrapper>
            <hr></hr>
        </>
    );

}


type AlarmProps = {
    Type: string,
    Title?: string,
    Content?: string,
    onClick?: (link: string, alarmId: number) => void,
    diaryId?: number,
    Accept?: ( diaryId: number ) => void,
    Refuse?: ( diaryId: number ) => void,
    link?: string,
    alarmId?: number,
}

export default AlarmMessage;