import React from 'react';

import {StyleSheet} from 'react-native';
import {Container, Content} from "native-base";
import AppHeader from "../components/AppHeader";
import AppCard from "../components/AppCard";
import AppFooter from "../components/AppFooter";

function TechnicianHome () {
    return (
        <Container>
            <AppHeader title="Job List - November 7"/>
            <Content padder>
                <AppCard
                    title="Weekly Maintenance"
                    subtitle="30 minutes from now"
                    description="Vacuum, brush scumline, add chlorine pucks"
                    address="82 Frost St."
                    time="3:30-4:30PM"
                />
            </Content>

            <AppFooter/>
        </Container>
    );
}

const styles = StyleSheet.create({

});

export default TechnicianHome;
