import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingTop: "65px"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ControlledExpansionPanels() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>UI </Typography>
          <Typography className={classes.secondaryHeading}>Frameworks</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            <ul>
              <li>Build Using React Library.</li>
              <li>Material-UI, the world's most popular React UI framework</li>
              <li>Deployed to <b>Heroku</b> a container-based cloud Platform as a Service (PaaS)</li>
            </ul>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>Data resources</Typography>
          <Typography className={classes.secondaryHeading}>
            API for COVID-19 stats
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            <ul>
              <li>API Collections to Help in the COVID-19 Fight: <a href="https://covid-19-apis.postman.com/" target='_blank'>https://covid-19-apis.postman.com/</a></li>
              <li>A volunteer-driven API for COVID-19 stats and patient tracing in India (Unofficial):<a href="https://api.covid19india.org/" target='_blank'> https://api.covid19india.org/</a></li>
              <li>COVID-19 REST API for India <a href="https://github.com/amodm/api-covid19-in" target='_blank'>https://github.com/amodm/api-covid19-in</a></li>
            </ul>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Connect </Typography>
          <Typography className={classes.secondaryHeading}>
            Social Media
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography style={{color: '#FFFFFF',
    textDecoration: 'none',padding:"0 10px"}}>
            <a href="https://www.instagram.com/_kapi1/" target="_blank" ><InstagramIcon /></a> &emsp;&emsp;
            <a href="https://www.linkedin.com/in/kapil-pandey-aa175b12a/" target="_blank" ><LinkedInIcon /></a>&emsp;&emsp;
            <a href="https://stackoverflow.com/users/11693215/kapil-pandey" target="_blank" ><QuestionAnswerIcon /></a>&emsp;&emsp; 
            <a href="mailto:kapil18pandey@gmail.com?Subject=Awesome%20Site😁" target="_top"><EmailIcon/></a>&emsp;&emsp; 
            <a href="tel:9634422066"><PhoneIcon/></a>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
