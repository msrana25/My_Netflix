import { collection, query, where, getDocs, onSnapshot, addDoc, doc } from '../firebase';

import React, { useEffect, useState } from 'react';
import db from '../firebase';
import './PlansScreen.css'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';

function PlansScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        if (user) {
            const subscriptionsCollection = collection(db, 'customers', user.uid, 'subscriptions');
            getDocs(subscriptionsCollection).then(querySnapshot => {
                querySnapshot.forEach(async (subscriptionDoc) => {
                    setSubscription({
                        role: subscriptionDoc.data().role,
                        current_period_end: subscriptionDoc.data().current_period_end.seconds,
                        current_period_start: subscriptionDoc.data().current_period_start.seconds
                    });
                });
            });
        }
    }, [user]);



    useEffect(() => {
        const q = query(collection(db, 'products'), where('active', '==', true));
        getDocs(q).then((querySnapshot) => {
            const products = {};
            querySnapshot.forEach(async productDoc => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await getDocs(collection(productDoc.ref, 'prices'));
                priceSnap.docs.forEach(price => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()

                    }
                })
            });
            setProducts(products);
        });
    }, []);

    //console.log(products);
    //console.log(subscription);

    const loadCheckout = async (priceId) => {
        alert('Please wait for 5 seconds while we redirect you to payment checkout');
        if (!priceId) {
            // handle case where priceId is undefined
            return;
        }

        const docRef = await addDoc(collection(doc(db, 'customers', user.uid), 'checkout_sessions'), {
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });

        onSnapshot(docRef, async (snap) => {
            const { error, sessionId } = snap.data();
            if (error) {
                alert('An error occured: ' + error.message);
            }


            if (sessionId) {
                const stripe = await loadStripe('pk_test_51MnU36CkDpLUoVPJnUpc0AjBcZIIz4M3wsejm0Qw6qn2uHaqU4Y9Er7uB7W3FYKLPntJTQz1gPQazpcD8SFKHHZ300siLb29av');
                stripe.redirectToCheckout({ sessionId });
            }

        });
    };

    return (
        <div className='plansScreen'>
            {subscription && <p>Renewal date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>}
            {Object.entries(products).map(([productId, productData]) => {
                // add some logic is user's subscription is active
                const isCurrentPackage = productData.name
                    ?.toLowerCase()
                    .includes(subscription?.role?.toLowerCase());
                return (
                    <div key={productId} className={`${isCurrentPackage && "plansScreen__plan--disabled"} plansScreen_plan`}>
                        <div className='plansScreen__info'>
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button onClick={() =>
                            !isCurrentPackage && loadCheckout(productData.prices.priceId)}>
                            {isCurrentPackage ? 'Current Package' : 'Subscribe'
                            }</button>
                    </div>
                );
            })}
        </div>
    )
}

export default PlansScreen
