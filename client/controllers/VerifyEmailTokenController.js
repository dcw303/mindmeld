VerifyEmailTokenController = RouteController.extend({
  verifyToken: function() {
    this.render('waiting');

    var routeContext = this;

    if (!Meteor.user()) {
      Accounts.verifyEmail(this.params.emailVerificationToken, function(error) {
        if (error) {
          routeContext.render({
            publicHeader: {to: 'header', data: {}}
          });          
          routeContext.data = {
            error: error
          };
          routeContext.render('error');
          return;
        }
        var redir = SessionAmplify.get('redir');
        if (redir) {
          SessionAmplify.set('redir', null);
          window.location.replace(redir);
        }
      });
    } else {
      routeContext.render({
        userHeader: { 
          to: 'header', 
          data: function() {
            return {
              otherMembers: null,
              username: Meteor.user().username
            }
          }
        }
      });
      routeContext.render('emailVerified');
      return;
    }
  }
});
