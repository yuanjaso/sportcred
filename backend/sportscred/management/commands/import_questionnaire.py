from yaml import load

from django.core.management.base import BaseCommand, CommandError

from sportscred.models import QuestionaireAnswer, QuestionaireQuestion


class Command(BaseCommand):
    help = "imports the questionnaires from a yaml"

    def add_arguments(self, parser):
        parser.add_argument("file", nargs="+", type=str)

    def handle(self, *args, **options):
        for input_file in options["file"]:
            with open(input_file, "r") as f:
                data = load(f.read())
            questions = data["QuestionnaireQuestion"]
            custom_answers = data["QuestionnaireAnswer"]
            for question in questions:
                q = QuestionaireQuestion.objects.create(
                    question_content=question["content"],
                    question_type=question["question_type"],
                )
                if question["question_type"] == "QN":
                    q.max_int = question["max_int"]
                    q.min_int = question["min_int"]
                q.save()
            for answer in custom_answers:
                q = QuestionaireQuestion.objects.get(
                    question_content=answer["original_question"]
                )
                a = QuestionaireAnswer.objects.create(
                    question=q, custom_answer=answer["answer"]
                )
                a.save()
