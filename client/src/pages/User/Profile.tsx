import React from 'react';
import Container from "../../components/common-components/Container/Container";
import {useAppSelectors} from "../../hooks/redux";
import Button from "../../components/common-components/Button/Button";
import {useNavigate} from "react-router-dom";
import Image from "../../components/common-components/Image/Image";
import Title from "../../components/common-components/Title/Title";
import Text from "../../components/common-components/Text/Text";


const Profile = () => {
    const navigate = useNavigate()
    const { currentUser } = useAppSelectors(state => state.userReducer)
    return (
        <Container>
            <Button
                onClick={() => navigate(-1)}
                className={'m-[10px]'}
            >
                Назад
            </Button>
            {currentUser &&
                <>
                    <div className={'flex items-center justify-center gap-x-[20px]'}>
                        <div>
                            <Image
                                src={currentUser.image}
                                alt={currentUser.firstName}
                            />
                        </div>
                        <div>
                            <Title>{currentUser.lastName} {currentUser.firstName} {currentUser.patronymic}</Title>
                            <Text>{currentUser.email}</Text>
                            <Text>{currentUser.phone}</Text>
                            <Text>Отдел: {currentUser.department.name}</Text>
                        </div>
                    </div>
                </>
            }

        </Container>
    );
};

export default Profile;