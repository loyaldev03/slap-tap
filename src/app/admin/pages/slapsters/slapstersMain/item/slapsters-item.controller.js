(function () {
    'use strict';

    angular
        .module('manage.users.module')
        .controller('AdminSlapstersItemController', AdminSlapstersItemController);

    /* @ngInject */
    function AdminSlapstersItemController($auth, $scope, partners, $state, pageService, userService, adminUserService, NgTableParams, $mdToast, $q, Restangular, $mdDialog, $timeout, $rootScope, commonDialogService, $stateParams, toaster, buildData, productData, promocodeData, excuteItems, actionplanService, paymentsService, activityService, apiService, permissionService) {

        angular.extend($scope,  {
            
            user: {},
            buildData: buildData,
            programData: productData.filter(function(pro){return pro.typeProduct == 1}),
            extraProductData: productData.filter(function(pro){return pro.typeProduct == 3 }),
            promocodeData: promocodeData,
            paymentData: [],
            curUser: userService.getStoredUser(),
            excuteItems: excuteItems,
            readMore: readMore,
            changeStripeSubscription: changeStripeSubscription,
            partners: partners,
            userData: [],
            defaultStrategies: actionplanService.getDefaultConnectingStrategies(),
            strategies: [],
            startPlan: '',

            userID: $stateParams.user_id,
            ROLES: adminUserService.ROLES,
            STATUSES: adminUserService.STATUSES,
            accounts: [],
            selectedUserID: '',
            deleteItem: deleteItem,
            createOrSave: createOrSave,
            adminBuild: adminBuild,
            openExpertDialog: openExpertDialog,
            openSlapexpertDialog: openSlapexpertDialog,
            dialogCharge: dialogCharge,
            openNotes: openNotes,
            isItemReadMoreAvailable: isItemReadMoreAvailable,
            isItemEditable: isItemEditable, 
            isSlapExpert: isSlapExpert,
            isPermittedAction: isPermittedAction,

            //Journey
            isJouneyItemDone: isJouneyItemDone,
            //Success Metrics
            quaters: [{},{},{},{}],
            revenues: null,
            start: new Date(),
            end: new Date(),
            today: new Date(),
            startDate: null,
            
            anualInfo: {},
            //Payment:
            togglePayment: togglePayment,
            charge: charge,
            //Slap manager Milestones
            SMmilestones:[
                {
                    title: "Onboarding Call Set",
                    journey: {section: 'start', name: 'Onboarding Call Set'}
                },
                {
                    title: "Execute Call Set",
                    journey: {section: 'onboard', name: 'Execute Call Set'}
                },
                {
                    title: "SE Calls Set",
                    journey: {section: 'start', name: 'SE Calls Set'}
                },
                {
                    title: "SM Calls Set",
                    journey: {section: 'onboard', name: 'SM Calls Set'}
                },
                {
                    title: "SLAPstuff Sent",
                    journey: {section: 'q1', name: 'SLAPstuff Sent'}
                },
                {
                    title: "Q1 Feedback Call",
                    journey: {section: 'q1', name: 'Q1 Feedback'}
                },
                {
                    title: "SLAPbuddy Connected",
                    journey: {section: 'q2', name: 'SLAPbuddy Connected'}
                },
                {
                    title: "Q3 Hustle Call Set",
                    journey: {section: 'q3', name: 'Q3 Hustle Call Set'}
                },
                {
                    title: "Renewal Confirmed",
                    journey: {section: 'q4', name: 'Renewal Confirmed'}
                },
            ],
            toggleSMmilestone: toggleSMmilestone,
            //Activity Grid

            activityGridData: {
                gridOptions: {data:[]},
                gridActions: {}
            },
            activityGridReady: false,
            actFilter: {
                searchKeyword: '',
                startDate: '',
                endDate: ''  
            },
            buildActivityGridData: buildActivityGridData,
            activityTypes: activityService.activityTypes,
            activityFilter: {Milestone:true},
            changeUser: changeUser,
            isAdmin: isAdmin,

            //Activity dialog

            curMode: '',
            openItemDialog: openItemDialog,
            openDeleteItemDialog: openDeleteItemDialog,
            openManagerAccountabilityDialog: openManagerAccountabilityDialog,
            openManagerOnboardingDialog: openManagerOnboardingDialog,
            openManagerExecuteDialog: openManagerExecuteDialog,    
            openManagerDialog: openManagerDialog,        
            closeDialog: closeDialog,
            updateItem: updateItem,
            updateNotes: updateNotes,
            formData: {},

        });


        pageService
            .reset()
            .setShowBC(true)
            .addCrumb({name: 'SLAPsters', path: 'slapsters.list'});

        $timeout(activate);
        function activate() {
            reloadData()
            .then(function(){
                getSlapStatus().then(function() {
                    activatePayments();

                    initializeIdealJourney();
                     activityService.list($stateParams.user_id)
                    .then(function (response) {
                        $scope.activityData = response.data;
                        buildActivityGridData();
                    }).catch(function (err) { console.log(err); $state.go('slapsters'); });
                
                    

                    $scope.activityTypes
                    .filter(function(type){ return type.show = false; });

                    $scope.activityTypesSlice = $scope.activityTypes.slice(4);
                    
                    //remove slapassistant from dropdown for the type of client activity
                    $scope.activityTypesSlice = $scope.activityTypesSlice
                    .filter(function(type){ return type.name != 'SLAPassistant'; });


                    var startDate = ($scope.buildData && $scope.buildData.slapMindset && $scope.buildData.slapMindset.slapStartDate) ? $scope.buildData.slapMindset.slapStartDate : null;
                    $scope.startDate = startDate;

                    $scope.startPlan = $scope.user.planId;

                    //$scope.actFilter.startDate = new Date();
                    $scope.actFilter.endDate = new Date();
         
                    if(!startDate)
                        return;
                        
                    angular.extend($scope.quaters[0], _.merge(actionplanService.getNthQuater(startDate, 1), $scope.buildData.actionPlan ? $scope.buildData.actionPlan.whatsHappening[0] : {}));
                    angular.extend($scope.quaters[1], _.merge(actionplanService.getNthQuater(startDate, 2), $scope.buildData.actionPlan ? $scope.buildData.actionPlan.whatsHappening[1] : {}));
                    angular.extend($scope.quaters[2], _.merge(actionplanService.getNthQuater(startDate, 3), $scope.buildData.actionPlan ? $scope.buildData.actionPlan.whatsHappening[2] : {}));
                    angular.extend($scope.quaters[3], _.merge(actionplanService.getNthQuater(startDate, 4), $scope.buildData.actionPlan ? $scope.buildData.actionPlan.whatsHappening[3] : {}));
     
                    $scope.startDate = $scope.quaters[0].start.toDate();
                    $scope.endDate = $scope.quaters[3].end.toDate();

                    $scope.actFilter.startDate = moment($scope.user.createdAt).format("MM/DD/YYYY");
                    $scope.actFilter.endDate = $scope.quaters[3].end.format("MM/DD/YYYY");
                    
                    $scope.today = moment.max(moment($scope.startDate), moment()).toDate(); //If the user haven't started the tracking yet.

                    $scope.revenues = ($scope.buildData && $scope.buildData.yearGoal && $scope.buildData.yearGoal.revenueStreams && $scope.buildData.yearGoal.revenueStreams.revenues) ? $scope.buildData.yearGoal.revenueStreams.revenues : null;

                    doCalculation();
                })
            });
        }

        function initializeIdealJourney() {

            _.each($scope.quaters, function(quater, QID){
                quater.quaterTotal = {};
                quater.quaterClosed = {};
                quater.quaterProgress = {};

                quater.quaterProgress['action'] = quater.quaterTotal['action'] ? quater.quaterClosed['action'] / quater.quaterTotal['action'] * 100 : 0;
                quater.quaterProgress['action'] = quater.quaterProgress['action'].toFixed(2);
                quater.quaterProgress['sales'] = quater.quaterTotal['sales'] ? quater.quaterClosed['sales'] / quater.quaterTotal['sales'] * 100 : 0;
                quater.quaterProgress['sales'] = quater.quaterProgress['sales'].toFixed(2);
                quater.quaterProgress['reflextion'] = quater.quaterTotal['reflextion'] ? quater.quaterClosed['reflextion'] / quater.quaterTotal['reflextion'] * 100 : 0;
                quater.quaterProgress['reflextion'] = quater.quaterProgress['reflextion'].toFixed(2);
            });
        }

        function doCalculation() {

            _.each($scope.quaters, function(quater, QID){
                quater.quaterTotal['action'] = 0;
                quater.quaterClosed['action'] = 0;
                quater.quaterTotal['sales'] = 0;
                quater.quaterClosed['sales'] = 0;
                quater.quaterTotal['reflextion'] = 0;
                quater.quaterClosed['reflextion'] = 0;
            });
            _.each($scope.quaters, function(quater, QID){
                _.each($scope.excuteItems, function(item){ //Count Actions
                    
                    if (!(moment(item.dueDate).isBetween(quater.start, quater.end, 'day', '[]')))  
                        return;
                    
                    quater.quaterTotal[item.type] ++;

                    if (item.progress == 100)
                        quater.quaterClosed[item.type] ++;
                });

                quater.quaterProgress['action'] = quater.quaterTotal['action'] ? quater.quaterClosed['action'] / quater.quaterTotal['action'] * 100 : 0;
                quater.quaterProgress['action'] = quater.quaterProgress['action'].toFixed(2);

                quater.quaterProgress['sales'] = quater.quaterTotal['sales'] ? quater.quaterClosed['sales'] / quater.quaterTotal['sales'] * 100 : 0;
                quater.quaterProgress['sales'] = quater.quaterProgress['sales'].toFixed(2);

                quater.quaterProgress['reflextion'] = quater.quaterTotal['reflextion'] ? quater.quaterClosed['reflextion'] / quater.quaterTotal['reflextion'] * 100 : 0;
                quater.quaterProgress['reflextion'] = quater.quaterProgress['reflextion'].toFixed(2);
            });
            
            //For Succes Metrics

            


            $scope.revenues = $scope.revenues ? $scope.revenues.filter(function(revenue) {
                return (!revenue.deleted);
            }) : {};
            _.each($scope.revenues, function(revenue, revenueID){
                revenue.actualUnit = 0;
                revenue.unit = 0;
                revenue.progress = 0;
                revenue.quaterSale = [];
                for(var i = 0; i < 4; i ++)
                    revenue.quaterSale.push({
                        targetUnit: 0,
                        actualUnit: 0,
                        progress: 0
                    });
                _.each($scope.quaters, function(quater, QID){
                    revenue.quaterSale[QID].targetUnit += quater.units[revenue.name] ? (+quater.units[revenue.name]) : 0; 
                    var i = $scope.defaultStrategies.length;
                    while (i--) {
                        if ($scope.defaultStrategies[i].id === quater.strategy.id) {
                           $scope.strategies.push($scope.defaultStrategies[i].name);
                        }
                    }
                    var salesItems = $scope.excuteItems.filter(function(item){ 
                        return +item.title == +revenue.id && 
                                item.type == 'sales' &&
                                moment(item.dueDate).isBetween(quater.start, quater.end, 'day', '[]'); 
                    });
                    
                    _.each(salesItems, function(item){
                        if(item.progress == 100)
                            revenue.quaterSale[QID].actualUnit += item.saleUnit;
                    });

                    revenue.actualUnit += revenue.quaterSale[QID].actualUnit;
                    revenue.unit += revenue.quaterSale[QID].targetUnit;
                });    
            });
            
            
            // $scope.anualInfo.unit = 0;
            // $scope.anualInfo.actualUnit = 0;
            $scope.anualInfo.actualRevenueSum = 0;
            $scope.anualInfo.targetRevenueSum = 0;
            $scope.anualInfo.progress = 0;
            $scope.anualInfo.quaterSale = []
            for(var i = 0; i < 4; i ++)
                $scope.anualInfo.quaterSale.push({
                    // targetUnit: 0,
                    // actualUnit: 0,
                    progress: 0,
                    actualRevenueSum: 0,
                    targetRevenueSum: 0
                })
            
            _.each($scope.revenues, function(revenue, revenueID){
                $scope.anualInfo.actualRevenueSum += revenue.actualUnit * +revenue.sellingPrice;  
                $scope.anualInfo.targetRevenueSum += revenue.unit * +revenue.sellingPrice;  

                _.each($scope.quaters, function(quater, QID){
                    $scope.anualInfo.quaterSale[QID].targetRevenueSum += revenue.quaterSale[QID].targetUnit * +revenue.sellingPrice; ;
                    $scope.anualInfo.quaterSale[QID].actualRevenueSum += revenue.quaterSale[QID].actualUnit * +revenue.sellingPrice;  
                });
            });

            $scope.anualInfo.progress = $scope.anualInfo.targetRevenueSum ? $scope.anualInfo.actualRevenueSum / $scope.anualInfo.targetRevenueSum * 100 : 0;
            _.each($scope.quaters, function(quater, QID){
                $scope.anualInfo.quaterSale[QID].progress = $scope.anualInfo.quaterSale[QID].targetRevenueSum ? $scope.anualInfo.quaterSale[QID].actualRevenueSum / $scope.anualInfo.quaterSale[QID].targetRevenueSum * 100 : 0;
            });
        }

        function reloadData() {
            $scope.dataloaded = false;
            return adminUserService.list()
            .then(function (response) {
                $scope.userData = response.data;
                $scope.accounts = [];
                $scope.user = _.find(response.data, {_id: $scope.userID});

                if (!$scope.user)
                    $state.go('slapsters.list');

                $scope.selectedUserID = $scope.user._id;
                $scope.accounts = response.data.filter(function(user){
                    return user.role == 4 && user.businessName == $scope.user.businessName;
                });
                $scope.accounts = permissionService.filterSlapstersByPermission($scope.accounts);

                pageService
                    .addCrumb({name: $scope.user.businessName + ' / ' + ' Created on ' + moment($scope.user.createdAt).format('YYYY-MM-DD'), path: 'users.list'})
                    .setPageTitle($scope.user.businessName);

                
                $scope.dataloaded = true;
                return response;
            });
        }

        function getSlapStatus() {
            return adminUserService.getSlapStatus($scope.userID)
            .then(function(res) {
                $scope.slapStatus = res.data;
                $scope.isStatusReadMore = true;
                return res;
            })            
        }
        function createOrSave(event) {
            update().then(function(){
                toaster.pop({type: 'success', body: 'Success'});
            }).catch(function(err){
                console.log(err);
                $scope.user.couponId = null
                toaster.pop({type: 'error', body: err.data.message});
            });
        }

        function readMore(event) {
            $scope.isStatusReadMore = !$scope.isStatusReadMore
        }

        function changeStripeSubscription(event) {
            if ($scope.user.planId != $scope.startPlan) {
                var success = function(){
                    createOrSave(event);
                }
                commonDialogService.openDeleteItemDialog(event, 'When you change a SLAPsters Plan - it automatically changes their monthly subscription and their SLAPexpert Hours.   Are you sure you want to do this?  Do you have approval from the client?',
                'Change', success);
                $scope.startPlan = $scope.user.planId;
            }
            else {
                $scope.user.planId = $scope.startPlan;
                createOrSave(event);
            }
        }

        function update() {
            // return adminUserService.update(Restangular.stripRestangular($scope.user));
            return $scope.user.save();
        }

        function deleteItem(event) {
            var success = function(){

                adminUserService.delete($scope.user).then(function() {
                    toaster.pop({type: 'success', body: 'User archived.'});
                    $state.go('users.list');
                })
                .catch(function(err) {
                    console.log(err);
                });
            }
            commonDialogService.openDeleteItemDialog(event, 'Are you sure you want to remove this account?', 'Archive', success);
        }

        function deleteAction(event) {
            var success = function(){

                adminUserService.delete($scope.user).then(function() {
                    toaster.pop({type: 'success', body: 'Action Delete.'});
                    $state.go('users.list');
                })
                .catch(function(err) {
                    console.log(err);
                });
            }
            commonDialogService.openDeleteItemDialog(event, 'Are you sure you want to remove this action?', 'Delete', success);
        }

        function changeUser(user_id) {
            $state.go('slapsters.list');
            $state.go('slapsters.item', {user_id:user_id});
        }

        function isJouneyItemDone(section, name){
            var isEx = _.find($scope.activityData, {journey : {section:section, name: name}});
            if (isEx)
                return isEx;
            return null;
        }

        function isExecuteCallHappened() {
            var isEx = _.find($scope.activityData, {type: 'SLAPmanager', title: 'Execute Call'});
            if (isEx)
                return isEx;
            return null;
        }



        //Payments 
        
        function activatePayments() {
            loadPayments().then(function(){
                $scope.paymentData = paymentsService.transformationData($scope.paymentData);
                _.each($scope.paymentData, function(payment){
                    payment.promoCode = payment.couponName ? payment.couponName : '-'
                })
            });
        }

        function loadPayments() {
            return paymentsService.getStripePaymentsByUser($stateParams.user_id)
            .then(function (response) {
                $scope.paymentData = response.data;
                //For Josh, we need to add manually payment history which is not existing in stripe
                if ($stateParams.user_id == '59c1e0c4dcb3a054d970e9c5' || $stateParams.user_id == '5a53b6affac52d34ff6c6eb6') {
                    var josh_data = paymentsService.getJoshPrevPaymentInStatic();
                    $scope.paymentData =  $scope.paymentData.concat(josh_data);
                }
                //For Eduardo, we need to add manually payment history which is not existing in stripe
                if ($stateParams.user_id == '5a36bac6c9d84206eb6e2f3c') {
                    var eduardo_data = paymentsService.getEduardoPrevPaymentInStatic();
                    $scope.paymentData =  $scope.paymentData.concat(eduardo_data);
                }
                var _paymentData = [];
                _.each($scope.paymentData, function(payment){
                    
                    payment.paymentDT = new Date(payment.paymentDate);
                    _paymentData.push(payment);
                    if (payment.refunds) {
                        payment.refunds.forEach(function(refund){
                            var _payment = angular.copy(payment, {})
                            _payment.amountCharges = (-1) * +refund.amount / 100;
                            _paymentData.push(_payment)                            
                        })
                    }
                })
                $scope.paymentData = _paymentData;
                return $scope.paymentData;
            }).catch(function(err) { console.log(err); $state.go('slapsters'); });
        }

        function togglePayment() {
            $scope.user.pausingPayment = !$scope.user.pausingPayment;                
            createOrSave()
            .then(function() {
                // $scope.user.pausingPayment = !$scope.user.pausingPayment;                
            })
            .catch(function(err) {
                $scope.user.pausingPayment = !$scope.user.pausingPayment;                
                console.log(err);
            })
            // paymentsService.toggleSubscription($scope.user);
        }

        function dialogCharge(type) {            

            charge(type);
            closeDialog();
        }

        function charge (type) {
            if($scope.user.pausingPayment)
                return toaster.pop({type: 'error', body: 'This user was paused payment.'});
            var productName = '';
            if( type == 0 ) {// 1:! meeting
                productName = 'Missing 1:1 Call';
            } else if( type == 1 ) { // Group meeting 
                productName = 'Missing Group Call';
            }
            if(!confirm('Charging user for ' + productName))
                return;
            var product = _.find($scope.extraProductData, {productName: productName});
            if(!product) {
                alert('No Product Yet, Add meeting products. Try with seed.');
            }

            paymentsService.chargeUser(product, $scope.userID)
                .then(function(resp){
                    missCall('SLAPexpert', 'Missed SE Call');
                    toaster.pop({type: 'success', body: 'Success'});
                    activatePayments();
                }).catch(function(err){
                    // toaster.pop({type: 'error', body: err.data.message});
                });
        }

        function missCall(type, title) {
            var missCallForm = {
                type: type,
                title: title,
                extra: {},
                notes: '',
                userId: $scope.userID
            }
            $scope.formData = missCallForm;
            $scope.updateNotes();                    

        }
        
        function toggleSMmilestone(item) {
            var existingItem = isJouneyItemDone(item.journey.section, item.journey.name);
            if(!existingItem) {
                var activity = {
                    userId: $scope.userID,
                    title: item.title,
                    type: 'SLAPmanager',  
                    notes: item.title,
                    journey: item.journey
                };
                activityService.add(activity)
                .then(function(resp){
                    $scope.activityData.push(resp.data);
                });    
            } else {
                existingItem.remove()
                .then(function(resp){
                    var index = $scope.activityData.map(function(i){return i._id}).indexOf(existingItem._id);
                    $scope.activityData.splice(index, 1);
                });
            }
            
        }

        function buildActivityGridData() {
            var data = {}; 
            
            $scope.activityGridReady = false;
            var indexofManager = _.findIndex($scope.activityTypes, ['id','SLAPmanager']);
            var indexOfAssistant = _.findIndex($scope.activityTypes, ['id', 'SLAPassistant']);
            $scope.activityTypes[indexOfAssistant].hidden = $scope.activityTypes[indexofManager].show;
            $scope.activityTypes[indexOfAssistant].show = $scope.activityTypes[indexofManager].show;
            $timeout(function(){

                var types = $scope.activityTypes
                .filter(function(type){ 
                    return type.show || type.hidden; 
                })
                .map(function(type){return type.id});
                var filtered = $scope.activityData.filter(function(activity){
                    var valid = false;
                    if ($scope.actFilter.searchKeyword.trim() != ''){
                        if (activity.title.toLowerCase().indexOf($scope.actFilter.searchKeyword.toLowerCase()) != -1)
                            valid = true;
                        if (activity.notes.toLowerCase().indexOf($scope.actFilter.searchKeyword.toLowerCase()) != -1)
                            valid = true;
                    } else { valid = true; }

                    if (moment(activity.createdAt).isBetween(moment($scope.actFilter.startDate), moment($scope.actFilter.endDate), 'day', '[]'))
                        valid &= true;
                    else
                        valid &= false;
                    

                    if(types.indexOf(activity.type) == -1)
                        valid &= false;
                    else
                        valid &= true;
                    
                    return valid;
                })
                
                filtered = filtered.reverse();
                var roles = ["Admin", "SLAPexpert", "SLAPmanager",  "SLAPster",  "Partner",  "TEST"];
                data.data = filtered.map(function(act){
                    // var role = _.find($scope.ROLES, {id: user.role});
                    // user.displayRole = role ? role.name : '';
                    var updateBy = _.find($scope.userData, {_id: act.updatedBy});
                    act.updatedByUserName = updateBy ? updateBy.name + " " + updateBy.lastName : 'Admin';
                    act.createdDate = moment(act.createdAt).format('MM/DD/YYYY');
                    act.createdTime = moment(act.createdAt).format('h:mm A');
                    return act;
                });
               

                data.urlSync = false;
                $scope.activityGridData = {
                    gridOptions: data,
                    gridActions: {},
                };
                $scope.activityGridReady = true;
            })

            
            
        }


        function closeDialog() {
            $mdDialog.hide();
        }

        function isItemReadMoreAvailable(item) {
            return !(item.title == 'Missed SM Call' || item.title == 'Missed SE Call')  
        }

        function isItemEditable(item) {
            return !(item.title == 'Missed SM Call' || item.title == 'Missed SE Call')  
        }

        function openItemDialog($event, mode, item) {
            $scope.curMode = mode;
            if ($scope.curMode == 'add') {
                var newForm = {
                    type: '',
                    title: '',
                    notes: '',
                    userId: $scope.userID
                };
                
                $scope.formData = newForm;
            } else if ($scope.curMode == 'edit') {
                $scope.formData = apiService.rest.copy(item);
            }
            $mdDialog.show({
                clickOutsideToClose: true,
                targetEvent: $event,
                scope: $scope, 
                preserveScope: true,
                templateUrl: 'admin/components/dialogs/activity-dialog/activity-dialog.html',
                controller: 'ActivityDialogController',
                autoWrap: true
            });
        }

        function openSlapexpertDialog($event, item) {
            var newForm = {
                type: 'SLAPexpert',
                title: 'SLAPexpert Call',
                extra: {
                    typeForPopUp: 'SLAPexpert Call',
                    date: '',
                    hours: '',
                    minutes: '',
                    callLength: 0,
                    tool: '',
                    mindset: 0,
                    statement: 0,
                    goals: 0,
                    items: 0,
                    rate: 0,
                    priorities: '',
                    spec: '',
                },
                notes: '',
                userId: $scope.userID,
                updatedBy: $scope.curUser._id
            };
            
            $scope.formData = newForm;
            
            $mdDialog.show({
                clickOutsideToClose: true,
                targetEvent: $event,
                scope: $scope, 
                preserveScope: true,
                templateUrl: 'admin/components/dialogs/slapexpert-dialog/slapexpert-dialog.html',
                controller: 'SlapexpertDialogController',
                autoWrap: true
            });
        }

        function openExpertDialog($event, item) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Record Client Interaction?')
                .textContent()
                .ariaLabel('CIN')
                .targetEvent($event)
                .ok('Attended SLAPexpert Meeting - record CIN')
                .cancel('Missed Meeting - charge cancellation fee');
        
                $mdDialog.show(confirm).then(function() {
                    openSlapexpertDialog($event, item);
                    }, function () {
                        $mdDialog.show({
                            clickOutsideToClose: true,
                            targetEvent: $event,
                            scope: $scope, 
                            preserveScope: true,
                            templateUrl: 'admin/components/dialogs/meeting-dialog/meeting-dialog.html',
                            controller: 'MeetingDialogController',
                            autoWrap: true
                        });
                    });
        }

        function openManagerDialog($event, item, meeting_type) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Record Client Interaction?')
                .textContent()
                .ariaLabel('CIN')
                .targetEvent($event)
                .ok('Attended Meeting')
                .cancel('Missed Meeting');            
                $mdDialog.show(confirm).then(function() {
                        if (meeting_type == 'onboarding') {
                            openManagerOnboardingDialog($event, item);
                        }
                        else if (meeting_type == 'execute') {
                            openManagerExecuteDialog($event, item)
                        }
                        else if (meeting_type == 'accountability') {
                            openManagerAccountabilityDialog($event, item);
                        }
                    }, function() {
                        missCall('SLAPmanager', 'Missed SM ' + meeting_type.charAt(0).toUpperCase() + meeting_type.slice(1) + " Call");
                })
        }
        function openManagerAccountabilityDialog($event, item){
            var newForm = {
                type: 'SLAPmanager',
                title: 'Accountability Call',
                extra: {
                    typeForPopUp:'Accountability Call',
                    // date: '',
                    // hours: '',
                    // minutes: '',
                    lasttime_logged:'',
                    what_discussion:'',
                    when_last_call:'',
                    when_next_call:'',
                    they_happy:'',
                    slap_expert_schedule:'',
                    when_slapster_slapschool:'',
                    discuss_events:'',
                    slapster_progress:'',
                    when_slapster_slapworld:'',
                    discuss_progress_in_slapworld:'',
                    key_priorities:''

                },
                notes: '',
                userId: $scope.userID,
            };

            $scope.formData = newForm;
            $mdDialog.show({
                clickOutsideToClose: true,
                targetEvent: $event,
                scope: $scope,
                preserveScope: true,
                templateUrl: 'admin/components/dialogs/slapmanager-accountability-dialog/slapmanager-account-dialog.html',
                controller: 'SlapManagerAccountDialogController',
                autoWrap: true
            });
            // $mdDialog.show({
            //     clickOutsideToClose: true,
            //     targetEvent: $event,
            //     scope: $scope,
            //     preserveScope: true,
                
            //     autoWrap: true
            // });
        }
        
        function openManagerOnboardingDialog($event, item){
            var newForm = {
                type: 'SLAPmanager',
                title: 'Onboarding Call',
                extra: {
                    typeForPopUp: 'Onboarding Call',
                },
                notes: '',
                userId: $scope.userID,
            };

            $scope.formData = newForm;
            $mdDialog.show({
                clickOutsideToClose: true,
                targetEvent: $event,
                scope: $scope,
                preserveScope: true,
                templateUrl: 'admin/components/dialogs/slapmanager-onboarding-dialog/slapmanager-onboard-dialog.html',
                controller: 'SlapManagerOnboardingDialogController',
                autoWrap: true
            });
        }

        function openManagerExecuteDialog($event, item) {
            var newForm = {
                type: 'SLAPmanager',
                title: 'Execute Call',
                extra: {
                    typeForPopUp:'Execute Call',
                },
                notes: '',
                userId: $scope.userID,
            };

            $scope.formData = newForm;
            $mdDialog.show({
                clickOutsideToClose: true,
                targetEvent: $event,
                scope: $scope,
                preserveScope: true,
                templateUrl: 'admin/components/dialogs/slapmanager-execute-dialog/slapmanager-execute-dialog.html',
                controller: 'SlapManagerExecuteDialogController',
                autoWrap: true
            });            
        }            

        function updateNotes($event, form) { 
            if(form && form.$invalid) {
                toaster.pop({type: 'error', body: "You cannot finalize this process until all fields are completed.", timeout: 2000});
                vm.buttonDisabled = false;
                return;
            }
            if ($scope.formData.extra.date){
                $scope.formData.extra.date = new Date($scope.formData.extra.date.getFullYear(), $scope.formData.extra.date.getMonth(), $scope.formData.extra.date.getDate(), $scope.formData.extra.hours, $scope.formData.extra.minutes);
            }
            if ($scope.formData.extra.hours || $scope.formData.extra.minutes) {
                $scope.formData.extra.callLength = $scope.formData.extra.hours * 60 + $scope.formData.extra.minutes;
            }
            activityService.add($scope.formData)
                .then(function(response){
                    $scope.activityData.push(response.data);
                    showToast('Added Activity');
                    buildActivityGridData();
                });
            $mdDialog.hide($event);
        }
        
        function updateItem($event) {
            if ($scope.curMode == 'add') {
                
                activityService.add($scope.formData)
                .then(function(response){
                    $scope.activityData.push(response.data);
                    showToast('Added Activity');
                    buildActivityGridData();
                });
            } else if($scope.curMode == 'edit') {
                
                $scope.formData.save().then(function(item){
                    var index = _.findIndex($scope.activityData, {_id: $scope.formData._id});
                    $scope.activityData[index] = $scope.formData;
                    showToast('Updated');
                    buildActivityGridData();
                });
            } 
            $mdDialog.hide($event);
        }

        function showToast(message) {
            var toast = $mdToast.simple()
            .textContent(message)
            .action('OK')
            .hideDelay(3000)
            .position("bottom right");

            $mdToast.show(toast).then(function(response) {
                if ( response == 'ok' ) {
                    $mdToast.hide();
                }
            });
        }

        function openDeleteItemDialog($event, item) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Confirm Delete')
                .textContent('Are you sure you want to remove this action?')
                .ariaLabel('Delete')
                .targetEvent($event)
                .ok('Delete')
                .cancel('No');

            $mdDialog.show(confirm).then(function() {
                item.remove().then(function(response) {
                    var index = _.findIndex($scope.activityData, {_id: item._id});
                    $scope.activityData.splice(index, 1);
                    showToast('Deleted Activity');
                    buildActivityGridData();
                });
            }, function() {
            });
        }

        function openNotes($event, item) {
            var confirm = $mdDialog.alert()
                .title('Note')
                // .textContent()
                .ariaLabel('Note')
                .targetEvent($event)
                .ok('Ok')
            $scope.item = item;
            $mdDialog.show({
                clickOutsideToClose: true,
                targetEvent: $event,
                scope: $scope,
                preserveScope: true,
                templateUrl: 'admin/components/dialogs/read-more-dialog/read-more-dialog.html',
                // controller: 'ReadMoreDialogController',
                autoWrap: true
            });
        }

        function adminBuild(item) {
            apiService.adminToken = $auth.getToken();

            adminUserService.getToken(item._id).then(function (res){
                $auth.setToken(res.data.token);
                $state.go('home');
                document.location.reload(true);
                //var url = $state.href('login',{token: res.data.token})
                //window.open(url, '_blank');
            });
        }

        function isAdmin() {
            if($scope.curUser.role == 1 || $scope.curUser.role == 3) return true;
            else return false;
        }


        function isSlapExpert() {
            return ($scope.curUser.role == 2)            
        }

        function isPermittedAction(action_name) {
            return permissionService.isPermittedAction($scope.curUser, action_name);
        }
}
}());