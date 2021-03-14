from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView


from ...kakulate import kakulate


class BasicKakulatorAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        if not (query := self.request.data.get("query")):
            return Response("Nothing to kakulate", status=400)

        kakulated_result = kakulate(query)

        # TODO: save kakulation to database

        return Response(
            {
                "query": query,
                "kakulated_result": kakulated_result,
            }
        )
