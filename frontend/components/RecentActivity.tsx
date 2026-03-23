import styled from "@emotion/styled";
import { Activity } from "@/types/activityType";
import { activityCategories } from "@/data/activities";
import { Icon } from "lucide-react";
import { space } from "@kinsta/stratus";

const DivWrapper = styled.div((props) => ({
    width: '100%',
    paddingInline: '10px',
    gap: '16px',
    alignItems: 'center',
    fontSize: '18px'
}));

const ActivitiesWrapperDiv = styled.div((props) => ({
    width: '100%',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    alignItems: 'center',
    fontSize: '15px'
}));

const ActivityDiv = styled.div((props) => ({
    display: 'flex',
    borderRadius: 16,
    padding: 10,
    background: props.theme.colors.background,
    color: props.theme.colors.text,
    gap: space[200],
    alignItems: 'center',
    border: `solid 4px ${props.theme.colors.text}`,
    width: '100%'
}));

const IconWrapper = styled.div({
    flexShrink: 0,
    width: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2
})

function RecentActivity({ activities }: { activities: Activity[] }) {
    return (
        <DivWrapper>
            <div>Recent activites</div>
            <ActivitiesWrapperDiv>
                {activities.map((activity, index) => {
                    const category = activityCategories[activity.activityCategory]
                    const Icon = category.icon
                    return (
                        <ActivityDiv key={index} style={{ border: 'white 2px solid' }}>
                            <IconWrapper>
                                <Icon size={30} />
                            </IconWrapper>
                            <span>{activity.message}</span>
                        </ActivityDiv>
                    )
                })}
            </ActivitiesWrapperDiv>
        </DivWrapper >
    )
}

export default RecentActivity