import Gallery from '@components/Gallery';
import SimpleReactLightbox from 'simple-react-lightbox'

export default {
  title: 'Components/Gallery',
  component: Gallery,
  argTypes: {
        items: {
            control: {
                type: 'object',
            },
            defaultValue: [{
                alt: "",
                thumbnail: "http://www.mumfordwood.com/images/2020Galleries/Box%20Sash/_MG_6236-touch-up.jpg",
                large: "http://www.mumfordwood.com/images/2020Galleries/Box%20Sash/_MG_6236-touch-up.jpg"
            },{
                alt: "",
                thumbnail: "http://www.mumfordwood.com/images/2020Galleries/Box%20Sash/_MG_6236-touch-up.jpg",
                large: "http://www.mumfordwood.com/images/2020Galleries/Box%20Sash/_MG_6236-touch-up.jpg"
            },
            {
                alt: "",
                thumbnail: "http://www.mumfordwood.com/images/2020Galleries/Box%20Sash/_MG_6236-touch-up.jpg",
                large: "http://www.mumfordwood.com/images/2020Galleries/Box%20Sash/_MG_6236-touch-up.jpg"
            },
            {
                alt: "",
                thumbnail: "http://www.mumfordwood.com/images/2020Galleries/Box%20Sash/_MG_6236-touch-up.jpg",
                large: "http://www.mumfordwood.com/images/2020Galleries/Box%20Sash/_MG_6236-touch-up.jpg"
            },
            {
                alt: "",
                thumbnail: "http://www.mumfordwood.com/images/2020Galleries/Box%20Sash/_MG_6236-touch-up.jpg",
                large: "http://www.mumfordwood.com/images/2020Galleries/Box%20Sash/_MG_6236-touch-up.jpg"
            },
            {
                alt: "",
                thumbnail: "http://www.mumfordwood.com/images/2020Galleries/Box%20Sash/_MG_6236-touch-up.jpg",
                large: "http://www.mumfordwood.com/images/2020Galleries/Box%20Sash/_MG_6236-touch-up.jpg"
            },
            {
                alt: "",
                thumbnail: "http://www.mumfordwood.com/images/2020Galleries/Box%20Sash/_MG_6236-touch-up.jpg",
                large: "http://www.mumfordwood.com/images/2020Galleries/Box%20Sash/_MG_6236-touch-up.jpg"
            },
            {
                alt: "",
                thumbnail: "http://www.mumfordwood.com/images/2020Galleries/Box%20Sash/_MG_6236-touch-up.jpg",
                large: "http://www.mumfordwood.com/images/2020Galleries/Box%20Sash/_MG_6236-touch-up.jpg"
            }],
        },
    }
}

const Template = (args) => <SimpleReactLightbox><Gallery {...args} /></SimpleReactLightbox>;
export const Playground = Template.bind({});
