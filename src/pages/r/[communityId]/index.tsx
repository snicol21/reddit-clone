import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import safeJsonStringify from 'safe-json-stringify';
import { Community } from '../../../atoms/communitiesAtom';
import CommunityHeader from '../../../components/Community/CommunityHeader';
import CommunityNotFound from '../../../components/Community/CommunityNotFound';
import PageContent from '../../../components/Layout/PageContent';
import { firestore } from '../../../firebase/clientApp';

type Props = {
  communityData: Community;
};

const CommunityPage = ({ communityData }: Props) => {
  if (!communityData) {
    return <CommunityNotFound />;
  }

  return (
    <>
      <CommunityHeader communityData={communityData} />
      <PageContent>
        <>
          <div>LEFT</div>
        </>
        <>
          <div>RIGHT</div>
        </>
      </PageContent>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // get the community data and pass to client
  try {
    const communityDocRef = doc(firestore, 'communities', context.query.communityId as string);
    const communityDoc = await getDoc(communityDocRef);
    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() }))
          : '',
      },
    };
  } catch (error) {
    // could add error page here
    console.log('getServerSideProps error', error);
  }
}

export default CommunityPage;
