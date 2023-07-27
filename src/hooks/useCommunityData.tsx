import { collection, doc, getDocs, increment, writeBatch } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';
import { Community, CommunitySnippet, communityState } from '../atoms/communitiesAtom';
import { auth, firestore } from '../firebase/clientApp';

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const onJoinOrLeaveCommunity = (communityData: Community, isJoined: boolean) => {
    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };

  const getMySnippets = async () => {
    try {
      // get user snippets
      const snippetDocs = await getDocs(collection(firestore, `users/${user?.uid}/communitySnippets`));
      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      setCommunityStateValue((prev) => ({ ...prev, mySnippets: snippets as CommunitySnippet[] }));
    } catch (error: any) {
      console.log('getMySnippets error', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const joinCommunity = async (communityData: Community) => {
    try {
      const batch = writeBatch(firestore);
      // creating a new community snippet
      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || '',
      };
      batch.set(doc(firestore, `users/${user?.uid}/communitySnippets`, communityData.id), newSnippet);
      // updating the numberOfMembers (+1)
      batch.update(doc(firestore, 'communities', communityData.id), {
        numberOfMembers: increment(1),
      });
      await batch.commit();
      // update recoil state communityState.mySnippets
      setCommunityStateValue((prev) => ({ ...prev, mySnippets: [...prev.mySnippets, newSnippet] }));
    } catch (error: any) {
      console.log('joinCommunity error', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const leaveCommunity = async (communityId: string) => {
    try {
      const batch = writeBatch(firestore);
      // deleting a new community snippet
      batch.delete(doc(firestore, `users/${user?.uid}/communitySnippets`, communityId));
      // updating the numberOfMembers (-1)
      batch.update(doc(firestore, 'communities', communityId), {
        numberOfMembers: increment(-1),
      });
      await batch.commit();
      // update recoil state communityState.mySnippets
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter((item) => item.communityId !== communityId),
      }));
    } catch (error: any) {
      console.log('leaveCommunity error', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    getMySnippets();
  }, [user]);

  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    isLoading,
    error,
  };
};

export default useCommunityData;
