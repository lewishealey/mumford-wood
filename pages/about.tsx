import React from 'react';
import styles from '../styles/Home.module.css'
import { Header } from '@components/Header';
import LoggedIn from '@components/LoggedIn';
import Layout from '@layouts/Layout';
import Body from '@components/Body';

import Banner from '@images/aboutus-banner.jpg';


export default function About() {
    return (
      <Layout
        title="About"
        image={Banner}>
        <h2 className="font-heading text-3xl mb-2">State-of-the-art manufacturing meets time served craftsmanship</h2>
        <Body>
            <p>The Mumford & Wood story began in 1954 when two woodworking apprentices, Derek Mumford and Dennis Wood, formed their own business partnership, primarily undertaking refurbishment work in and around Essex.</p>
            <p>Increasing demand during the 1960s and 70s for the Limited company’s high quality joinery and refurbishment skills saw successive moves from a relatively humble facility to larger premises in Ongar, Essex.</p>
            <p>A Statement of Intent was made in 1984 when Mumford & Wood became the first manufacturer in the UK to install an automated window construction line. This immediately created new design possibilities and efficiencies and lead to an increasing focus on the architectural market.</p>
            <p>In 1997, with the progression of the carefully coordinated Conservation™ range, Mumford & Wood produced the first fully factory finished, double glazed sash window in the industry. The company also pioneered and developed the system for creating Georgian replica windows using applied glazing bars.</p>
            <p>A year later Mumford & Wood moved to its current location in Tiptree, Essex. Since then a process of continuous upgrade in plant and equipment has ensured the company remains undeniably ahead with market-leading technology and innovation.</p>
            <p>It was in 2006 that Mumford & Wood was brought out by newly formed The Performance Window Group with Roy Wakeman OBE, as executive chairman, along with Mark de Rozarieux as group financial director and Richard Haycock as non-executive director.</p>
            <p>Shortly after this change the association with the Mumford’s and the Wood’s ceased and now John and Chris, both sons of the founders, are involved in separate businesses outside the group. However, the skilled and committed workforce stayed with the company and today form the backbone of this thriving business.</p>
            <p>The company reached 60 years in summer 2014 and to mark this anniversary, together with the completion of a remarkable 2-year development period and an investment of £1.5m in new computerised plant and equipment, the summer of 2015 saw a celebration attended by Guest of Honour The Right Honourable Priti Patel MP, Minister of State for Employment, who formally opened this state-of-the-art manufacturing facility.</p>
            <p>The company continues to invest and expand in order to increase output and productivity while maintaining a reputation of quality and service to core customer groups including architects, developers, designers and owners of aspirational homes. All manufacturing is undertaken in Tiptree, Essex, overcoming the burden of an extended supply chain with European suppliers while maintaining a responsible, sustainability ethos with innovation and flair.</p>
            <p>Alongside the high performance Conservation™ range now sits the elegant Classic™ collection of made-to-order wooden timber windows and doors that feature an alternative slim panel glazing system. Classic™ products achieve a period aesthetic which makes them ideal for window replacement and upgrade in heritage projects, and those in conservation areas, where planning restrictions may apply. For buildings of great architectural significance and importance the Heritage™ range of single glazed products is achieving its rightful place in some of this country’s most famous and much-loved regal buildings.</p>
        </Body>

        <LoggedIn location="About" entity="CAD profiles">
            About login copy
        </LoggedIn>

      </Layout>
    );
  }
