import * as React from 'react';
import styles from '@/styles/components/component.module.scss'
import TabList from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface ITeamTabs {
    data: {
        id: number;
        city: string;
        name: string;
        conference: number;
        area: number;
        image_file: string | null;
        back_image_file: string | null;
    }[];
    selectConf: number;
    selectTab: number;
    callback: (value: number) => void;
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

/**
 * タブに表示するアイコンを設定
 * @param subprops 
 * @returns 
 */
const IconImage:React.FC<{src: string | null}> = (subprops) => {
    return (
        <div style={{width: 50, height: 50}}>
            <img src={subprops.src ?? ''} />
        </div>
    )
}

const TeamTabs: React.FC<ITeamTabs> = (props) => {
  return (
    <Box sx={{ width: '100%' }} className={styles.teamTabs}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList 
            variant="scrollable"
            value={props.selectTab} 
            onChange={(e, value) => props.callback(value)} 
            aria-label="basic tabs" 
            TabIndicatorProps={{
            style: {
                backgroundColor: props.selectConf === 1 ? "#E85F5F" : '#4C62D9'
            }
        }}>
            {
                props.data.filter(x => x.conference === props.selectConf).map(val => (
                    <Tab key={val.id} className='teamTabComponent' label={val.name} icon={<IconImage src={`logos/${val.image_file}`} />} value={val.id} {...a11yProps(val.id)} />
                ))
            }
        </TabList>
      </Box>
    </Box>
  );
}

export default React.memo(TeamTabs)