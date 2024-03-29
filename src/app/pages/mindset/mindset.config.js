(function () {
    'use strict';

    angular
        .module('app.pages.mindset')
        .config(moduleConfig);

    function moduleConfig($stateProvider) {
        $stateProvider
            .state('mindset', {
                data: {
                    access: '@'
                },
                abstract: true,
                url: '/slapmindset',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view />'
                    }
                }
            })
            .state('mindset.ourCommitment', {
                url: '/ourcommitmenttoyou',
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.resolveActiveStep(this)
                            .then(function (active) {
                                if (active) {
                                    return active;
                                }

                                return stepService.getLastFinished()
                                    .then(function (finishedStep) {
                                        $state.go(finishedStep.sref);
                                    });
                            })
                    }
                },
                controller: 'OurCommitmentController',
                templateUrl: 'pages/mindset/our-commitment/our-commitment.html'
            })
            .state('mindset.yourCommitment', {
                url: '/yourcommitmenttous',
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.resolveActiveStep(this)
                            .then(function (active) {

                                if (active) {
                                    return active;
                                }

                                return stepService.getLastFinished()
                                    .then(function (finishedStep) {
                                        $state.go(finishedStep.sref);
                                    });
                            })
                    }
                },
                controller: 'YourCommitmentController',
                templateUrl: 'pages/mindset/your-commitment/your-commitment.html'
            })
            .state('mindset.chooseSlapexpert', {
                url: '/chooseslapexpert',
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.resolveActiveStep(this)
                            .then(function (active) {

                                if (active) {
                                    return active;
                                }

                                return stepService.getLastFinished()
                                    .then(function (finishedStep) {
                                        $state.go(finishedStep.sref);
                                    });
                            })
                    }                    
                },
                controller: 'ChooseSlapexpertController',
                templateUrl: 'pages/mindset/choose-slapexpert/choose-slapexpert.html'
            })
            .state('mindset.slapMindset', {
                url: '/SLAPmindset',
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.resolveActiveStep(this)
                            .then(function (active) {
                                if (active) {
                                    return active;
                                }

                                return stepService.getLastFinished()
                                    .then(function (finishedStep) {
                                        $state.go(finishedStep.sref);
                                    });
                            })
                    },
                    excuteItemServicecuteItems: function (excuteItemService) {
                        return excuteItemService.loadExcuteItems();
                    },
                },
                controller: 'SlapMindsetController',
                templateUrl: 'pages/mindset/get-slap-mindset/get-slap-mindset.html'
            })
            .state('mindset.privilegeAndResponsibility', {
                url: '/privilegeandresponsibility',
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.resolveActiveStep(this)
                            .then(function (active) {
                                if (active) {
                                    return active;
                                }

                                return stepService.getLastFinished()
                                    .then(function (finishedStep) {
                                        $state.go(finishedStep.sref);
                                    });
                            })
                    }
                },
                controller: 'PrivilegeAndResponsibilityController',
                templateUrl: 'pages/mindset/privilege_and_responsibility/privilege-and-responsibility.html'
            })
            .state('mindset.areYourStuck', {
                url: '/areyoustuck',
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.resolveActiveStep(this)
                            .then(function (active) {
                                if (active) {
                                    return active;
                                }

                                return stepService.getLastFinished()
                                    .then(function (finishedStep) {
                                        $state.go(finishedStep.sref);
                                    });
                            })
                    }
                },
                controller: 'AreYourStuckController',
                templateUrl: 'pages/mindset/are-your-stuck/are-your-stuck.html'
            })
            .state('mindset.cashFlow', {
                url: '/cashflowcapacitycatch22',
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.resolveActiveStep(this)
                            .then(function (active) {
                                if (active) {
                                    return active;
                                }

                                return stepService.getLastFinished()
                                    .then(function (finishedStep) {
                                        $state.go(finishedStep.sref);
                                    });
                            })
                    }
                },
                controller: 'CashFlowController',
                templateUrl: 'pages/mindset/cashflow/cashflow.html'
            })
            .state('mindset.yourBusiness', {
                url: '/planandaction',
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.resolveActiveStep(this)
                            .then(function (active) {
                                if (active) {
                                    return active;
                                }

                                return stepService.getLastFinished()
                                    .then(function (finishedStep) {
                                        $state.go(finishedStep.sref);
                                    });
                            })
                    }
                },
                controller: 'YourBusinessController',
                templateUrl: 'pages/mindset/your-business/your-business.html'
            })
            .state('mindset.topDownBottomUp', {
                url: '/topDownBottomUp',
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.resolveActiveStep(this)
                            .then(function (active) {
                                if (active) {
                                    return active;
                                }

                                return stepService.getLastFinished()
                                    .then(function (finishedStep) {
                                        $state.go(finishedStep.sref);
                                    });
                            })
                    }
                },
                controller: 'TopDownBottomUpController',
                templateUrl: 'pages/mindset/top-down-bottom-up/top-down-bottom-up.html'
            })
            .state('mindset.startSlapn', {
                url: '/startSLAPn',
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.resolveActiveStep(this)
                            .then(function (active) {
                                if (active) {
                                    return active;
                                }

                                return stepService.getLastFinished()
                                    .then(function (finishedStep) {
                                        $state.go(finishedStep.sref);
                                    });
                            })
                    }
                },
                controller: 'StartSlapnController',
                templateUrl: 'pages/mindset/start-slapn/start-slapn.html'
            })
            .state('mindset.slapStartDate', {
                url: '/getslapn',
                resolve: {
                    activeStep: function (stepService, $state) {
                        return stepService.resolveActiveStep(this)
                            .then(function (active) {
                                if (active) {
                                    return active;
                                }

                                return stepService.getLastFinished()
                                    .then(function (finishedStep) {
                                        $state.go(finishedStep.sref);
                                    });
                            })
                    },
                    excuteItems: function (excuteItemService) {
                        return excuteItemService.loadExcuteItems();
                    },
                },
                controller: 'SlapStartDateController',
                templateUrl: 'pages/mindset/slap-start-date/slap-start-date.html'
            });

    }
}());