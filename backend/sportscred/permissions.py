from rest_framework.permissions import BasePermission


class AnonCreateAndUpdateOwnerOnly(BasePermission):
    """
    Custom permission:
        - allow anonymous POST
        - allow authenticated GET and PUT on *own* record
        - allow all actions for staff
    """

    def has_permission(self, request, view):
        return (
            view.action in ["create", "login"]
            or request.user
            and request.user.is_authenticated
        )

    def has_object_permission(self, request, view, obj):
        return (
            view.action in ["retrieve", "update", "partial_update"]
            and obj.id == request.user.id
            or request.user.is_staff
        )


class QuestionnaireSuper(BasePermission):
    def has_permission(self, request, view):
        if view.action == "responses":
            return request.user.is_superuser
        return True


class DebateSuper(BasePermission):
    def has_permission(self, request, view):
        if view.action == "create":
            return request.user.is_superuser
        return True


class PredictionsSuper(BasePermission):
    def has_permission(self, request, view):
        if view.action == "admin":
            return request.user.is_superuser
        return True