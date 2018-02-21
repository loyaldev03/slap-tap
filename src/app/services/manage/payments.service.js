(function () {
    'use strict';

    angular
        .module('app.services')
        .service('paymentsService', paymentsService);

    /* @ngInject */
    function paymentsService(apiService, adminApiService) {

        this.getAllPayments = getAllPayments;

        this.transformationData = transformationData;
        this.getAllPaymentsByUser = getAllPaymentsByUser;
        this.chargeUser = chargeUser;
        this.toggleSubscription = toggleSubscription;
        this.getStripePayments = getStripePayments;
        this.getStripePaymentsByUser = getStripePaymentsByUser;
        this.getJoshPrevPaymentInStatic = getJoshPrevPaymentInStatic;
        this.getEduardoPrevPaymentInStatic = getEduardoPrevPaymentInStatic; 
        //////////////////////////////////

        function transformationData(data) {
            var dataTable = [];

            data.forEach(function (item) {
                // if (!item.status) item.amountCharges = 'Declined';
                // row.paymentDate = item.paymentDate;
                // row.programName = item.products.map(function (prod) {
                //     return prod.name;
                // }).join('/');
                // row.costProduct = null;
                //
                // item.products.forEach(function (prod) {
                //     row.costProduct += prod.cost ? prod.cost : prod.amount;
                // });
                // // var discount = row.costProduct - item.amountCharges;
                // // row.discount = discount ? '-' + discount : '-';
                // row.discount = row.costProduct - item.amountCharges;
                // row.amountCharges = item.amountCharges;
                // row.status = item.status;
                // row.couponId = item.couponId;
                dataTable.push(item);
            });

            return dataTable;
        }

        function getAllPayments() {
            return apiService.rest.all('payments').getList();
        }

        function getStripePayments(count) {
            return apiService.rest.all('stripe-payments').all(count).getList();
        }

        function getStripePaymentsByUser(userId) {
            return adminApiService.rest.all('stripe-payments').all(userId).getList();
        }

        function getAllPaymentsByUser(userId) {
            return adminApiService.rest.all('payments').all('paymentsByUser').all(userId).getList();
        }

        function chargeUser(product, userId) {
            return adminApiService.rest.all('payments').all('charge').all(userId).post(product);
        }

        function toggleSubscription(user) {
            let userId = user._id;
            let enable = !user.pausingPayment;
            return adminApiService.rest.all('payments').all('subscription').all('toggle').all(userId).post({
                "enable": enable
            });
        }
        
        function getJoshPrevPaymentInStatic() {
            let data = [
            {
                paymentDate: "Nov 1, 2016",
                amountCharges: 2000,
                refunds: [],
                discount: 0,
                status: 1,
                programName: "Build Fee",
                costProduct: 2000,
                totalAmountOwed: 0,
                route: "59c1e0c4dcb3a054d970e9c5",
                reqParams: null,
                restangularized: true,
                fromServer: true,
                parentResource: {
                      route: "stripe-payments",
                      parentResource: null
                },
                restangularCollection: false
            },
            {
            paymentDate: "Jan 17, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 1,
            programName: "MonthlySLAP1",
            costProduct: 250,
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
                paymentDate: "Feb 17, 2017",
                amountCharges: 250,
                refunds: [],
                discount: 0,
                status: 1,
                programName: "MonthlySLAP1",
                costProduct: 250,
                totalAmountOwed: 0,
                route: "59c1e0c4dcb3a054d970e9c5",
                reqParams: null,
                restangularized: true,
                fromServer: true,
                parentResource: {
                  route: "stripe-payments",
                  parentResource: null
                },
                restangularCollection: false
            },
            {
            paymentDate: "Mar 17, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 1,
            programName: "MonthlySLAP1",
            costProduct: 250,
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Apr 17, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 1,
            programName: "MonthlySLAP1",
            costProduct: 250,
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "May 17, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 1,
            programName: "MonthlySLAP1",
            costProduct: 250,
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Jun 12, 2017",
            amountCharges: 25,
            refunds: [],
            discount: 0,
            status: 1,
            programName: "Missed SLAPexpert Call",
            costProduct: 25,
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Jun 17, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 0,
            programName: "MonthlySLAP1",
            costProduct: 250,
            totalAmountOwed: 250,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Jun 20, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 0,
            programName: "MonthlySLAP1",
            costProduct: 250,
            totalAmountOwed: 250,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Jun 25, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 0,
            programName: "MonthlySLAP1",
            costProduct: 250,
            totalAmountOwed: 250,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Jun 30, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 0,
            programName: "June 2017",
            costProduct: 250,
            totalAmountOwed: 250,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Jul 2, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 0,
            programName: "MonthlySLAP1",
            costProduct: 250,
            totalAmountOwed: 250,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Jul 5, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 0,
            programName: "June 2017 Payment",
            costProduct: 250,
            totalAmountOwed: 250,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Jul 6, 2017",
            amountCharges: 1,
            refunds: [],
            discount: 0,
            status: 1,
            programName: "Payment from Josh Sherrard on form: setupcc",
            costProduct: 1,
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Jul 6, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 1,
            programName: "masterSLAP-CCDA",
            costProduct: 250,
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Jul 31, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 1,
            programName: "July Payment.",
            costProduct: 250,
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Aug 6, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 1,
            programName: "masterSLAP-CCDA",
            costProduct: 250,
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Sep 6, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 1,
            programName: "masterSLAP-CCDA",
            costProduct: 250,
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Oct 6, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 1,
            programName: "masterSLAP-CCDA",
            costProduct: 250,
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Nov 6, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 1,
            programName: "masterSLAP-CCDA",
            costProduct: 250,
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Dec 6, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 1,
            programName: "masterSLAP-CCDA",
            costProduct: 250,
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Jan 1, 2018",
            amountCharges: 250,
            refunds: [],
            discount: "-50",
            status: 1,
            programName: "monthlySLAP",
            costProduct: 300,
            couponName: "$50OFF_m",
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Jan 8, 2018",
            amountCharges: 250,
            refunds: [
              {
                id: "re_C72vfReaKxv2sJ",
                object: "refund",
                amount: 25000,
                balance_transaction: "txn_C72vedlrg06Nep",
                charge: "ch_C6HpdaahhXP4D2",
                created: 1515610939,
                currency: "usd",
                metadata: {},
                reason: "requested_by_customer",
                receipt_number: "3865-0416",
                status: "succeeded"
              }
            ],
            discount: "-50",
            status: 1,
            programName: "monthlySLAP",
            costProduct: 300,
            couponName: "$50OFF_m",
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Feb 8, 2018",
            amountCharges: 250,
            refunds: [
              {
                id: "re_CILPjRakqs3Oc2",
                object: "refund",
                amount: 25000,
                balance_transaction: "txn_CILPZWK6vysztc",
                charge: "ch_CHuoJs9vbx2Jmv",
                created: 1518216685,
                currency: "usd",
                metadata: {},
                reason: "duplicate",
                receipt_number: "3174-2303",
                status: "succeeded"
              }
            ],
            discount: "-50",
            status: 1,
            programName: "monthlySLAP",
            costProduct: 300,
            couponName: "$50OFF_m",
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Nov 1, 2016",
            amountCharges: 1,
            refunds: [],
            discount: 0,
            status: 1,
            programName: "Payment from Joshua Sherrard on form: setupcc",
            costProduct: 1,
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Nov 1, 2016",
            amountCharges: 2000,
            refunds: [],
            discount: 0,
            status: 1,
            programName: "Build Fee",
            costProduct: 2000,
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Jan 17, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 1,
            programName: "MonthlySLAP1",
            costProduct: 250,
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Feb 17, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 1,
            programName: "MonthlySLAP1",
            costProduct: 250,
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Mar 17, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 1,
            programName: "MonthlySLAP1",
            costProduct: 250,
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Apr 17, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 1,
            programName: "MonthlySLAP1",
            costProduct: 250,
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "May 17, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 1,
            programName: "MonthlySLAP1",
            costProduct: 250,
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Jun 12, 2017",
            amountCharges: 25,
            refunds: [],
            discount: 0,
            status: 1,
            programName: "Missed SLAPexpert Call",
            costProduct: 25,
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Jun 17, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 0,
            programName: "MonthlySLAP1",
            costProduct: 250,
            totalAmountOwed: 250,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Jun 20, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 0,
            programName: "MonthlySLAP1",
            costProduct: 250,
            totalAmountOwed: 250,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Jun 25, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 0,
            programName: "MonthlySLAP1",
            costProduct: 250,
            totalAmountOwed: 250,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Jun 30, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 0,
            programName: "June 2017",
            costProduct: 250,
            totalAmountOwed: 250,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Jul 2, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 0,
            programName: "MonthlySLAP1",
            costProduct: 250,
            totalAmountOwed: 250,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Jul 5, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 0,
            programName: "June 2017 Payment",
            costProduct: 250,
            totalAmountOwed: 250,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Jul 6, 2017",
            amountCharges: 1,
            refunds: [],
            discount: 0,
            status: 1,
            programName: "Payment from Josh Sherrard on form: setupcc",
            costProduct: 1,
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Jul 6, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 1,
            programName: "masterSLAP-CCDA",
            costProduct: 250,
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Jul 31, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 1,
            programName: "July Payment.",
            costProduct: 250,
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Aug 6, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 1,
            programName: "masterSLAP-CCDA",
            costProduct: 250,
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Sep 6, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 1,
            programName: "masterSLAP-CCDA",
            costProduct: 250,
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Oct 6, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 1,
            programName: "masterSLAP-CCDA",
            costProduct: 250,
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Nov 6, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 1,
            programName: "masterSLAP-CCDA",
            costProduct: 250,
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Dec 6, 2017",
            amountCharges: 250,
            refunds: [],
            discount: 0,
            status: 1,
            programName: "masterSLAP-CCDA",
            costProduct: 250,
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Jan 1, 2018",
            amountCharges: 250,
            refunds: [],
            discount: "-50",
            status: 1,
            programName: "monthlySLAP",
            costProduct: 300,
            couponName: "$50OFF_m",
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            },
            {
            paymentDate: "Jan 8, 2018",
            amountCharges: 250,
            refunds: [
              {
                id: "re_C72vfReaKxv2sJ",
                object: "refund",
                amount: 25000,
                balance_transaction: "txn_C72vedlrg06Nep",
                charge: "ch_C6HpdaahhXP4D2",
                created: 1515610939,
                currency: "usd",
                metadata: {},
                reason: "requested_by_customer",
                receipt_number: "3865-0416",
                status: "succeeded"
              }
            ],
            discount: "-50",
            status: 1,
            programName: "monthlySLAP",
            costProduct: 300,
            couponName: "$50OFF_m",
            totalAmountOwed: 0,
            route: "59c1e0c4dcb3a054d970e9c5",
            reqParams: null,
            restangularized: true,
            fromServer: true,
            parentResource: {
              route: "stripe-payments",
              parentResource: null
            },
            restangularCollection: false
            }
];
            return data;
        }

        function getEduardoPrevPaymentInStatic() {
            let data = [
                {
                    paymentDate: "Dec 17, 2017",
                    amountCharges: 500,
                    refunds: [],
                    discount: "0",
                    status: 1,
                    programName: "SLAPbuild One Time Payment",
                    costProduct: 500,
                    totalAmountOwed: 0,
                    route: "59c1e0c4dcb3a054d970e9c5",
                    reqParams: null,
                    restangularized: true,
                    fromServer: true,
                    parentResource: {
                      route: "stripe-payments",
                      parentResource: null
                    },
                    restangularCollection: false
                },
                {
                    paymentDate: "Jan 17, 2018",
                    amountCharges: 200,
                    refunds: [
                    ],
                    discount: "-100",
                    status: 1,
                    programName: "monthlySLAP",
                    costProduct: 300,
                    couponName: "$100OFF_m",
                    totalAmountOwed: 0,
                    route: "59c1e0c4dcb3a054d970e9c5",
                    reqParams: null,
                    restangularized: true,
                    fromServer: true,
                    parentResource: {
                      route: "stripe-payments",
                      parentResource: null
                    },
                    restangularCollection: false
                }
            ];
            return data;
        }        
    }
}());