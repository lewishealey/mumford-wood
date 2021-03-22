import React from 'react';
import styles from '../styles/Home.module.css'
import { Header } from '../src/components/Header';
import LoggedIn from 'src/components/LoggedIn';
import Layout from 'src/layouts/Layout';
import Body from 'src/components/Body';

import Banner from '../assets/images/aboutus-banner.jpg';


export default function Contact() {
    return (
      <Layout
        title="Contact"
        image={Banner}>

        <h2 className="font-heading text-3xl mb-2">State-of-the-art manufacturing meets time served craftsmanship</h2>
        <Body>
            <p>The Mumford & Wood story began in 1954 when two woodworking apprentices, Derek Mumford and Dennis Wood, formed their own business partnership, primarily undertaking refurbishment work in and around Essex.</p>
            <p>Increasing demand during the 1960s and 70s for the Limited company’s high quality joinery and refurbishment skills saw successive moves from a relatively humble facility to larger premises in Ongar, Essex.</p>
        </Body>

      </Layout>
    );
  }
